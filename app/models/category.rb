# frozen_string_literal: true

class Category < ApplicationRecord
  CATEGORY_TITLE_REGEX = /\A[a-zA-Z0-9\s]+\z/
  MAX_TITLE_LENGTH = 20

  scope :title_search, -> (title) { where("lower(title) like ?", "#{title}%") }

  has_many :articles, dependent: :delete_all

  validates :title, presence: true, uniqueness: true, length: { maximum: MAX_TITLE_LENGTH },
    format: { with: CATEGORY_TITLE_REGEX }

  acts_as_list
end
