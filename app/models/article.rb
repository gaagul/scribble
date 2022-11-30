# frozen_string_literal: true

class Article < ApplicationRecord
  ARTICLE_TITLE_REGEX = /[a-zA-Z]/
  MAX_TITLE_LENGTH = 50
  MAX_ARTICLES_COUNT = 9

  scope :categories_filter, -> (categories) { where(category_id: categories) unless categories.nil? }
  scope :status_filter, -> (status) { where(status: status) unless status == "all" }
  scope :title_search, -> (title) { where("lower(title) like ?", "#{title}%") }
  scope :sorted, -> { order("visits_count DESC") }

  belongs_to :user
  belongs_to :category

  has_many :visits, dependent: :destroy

  enum status: { Draft: 0, Published: 1 }

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: ARTICLE_TITLE_REGEX }
  validates :slug, uniqueness: true unless -> { slug.nil? }
  validate :slug_not_changed

  after_update :reset_position
  before_save :set_slug

  has_paper_trail ignore: [:position]
  paginates_per MAX_ARTICLES_COUNT

  acts_as_list scope: :category

  private

    def set_slug
      if status == "Published" && slug.nil?
        title_slug = title.parameterize
        latest_article_slug = Article.where(
          "slug ~* ?",
          "#{title_slug}$|#{title_slug}-[0-9]+$",
        ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
        slug_count = 0
        if latest_article_slug.present?
          slug_count = latest_article_slug.split("-").last.to_i
          only_one_slug_exists = slug_count == 0
          slug_count = 1 if only_one_slug_exists
        end
        slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
        self.slug = slug_candidate
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end

    def reset_position
      self.position = self.category.articles.count + 1 if self.category_id_changed?
    end
end
