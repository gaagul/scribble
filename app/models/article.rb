# frozen_string_literal: true

class Article < ApplicationRecord
  scope :categories_filter, -> (categories) { where category_id: categories unless categories.nil? }
  scope :status_filter, -> (status) { where status: status unless status == "all" }

  MAX_TITLE_LENGTH = 25

  belongs_to :category
  belongs_to :user
  belongs_to :organization

  enum status: { Draft: 0, Published: 1 }

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: /([A-z0-9])/ }
  validates :slug, uniqueness: true unless -> { slug.nil? }
  validate :slug_not_changed

  before_save :set_slug

  private

    def set_slug
      if status == "Published" && slug.nil?
        title_slug = title.parameterize
        latest_task_slug = Article.where(
          "slug ~* ?",
          "#{title_slug}$|#{title_slug}-[0-9]+$",
        ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
        slug_count = 0
        if latest_task_slug.present?
          slug_count = latest_task_slug.split("-").last.to_i
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
end
