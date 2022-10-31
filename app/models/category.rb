# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_TITLE_LENGTH = 20

  scope :title_search, -> (title) { where("lower(title) like ?", "#{title}%") }

  has_many :articles, dependent: :delete_all

  validates :title, presence: true, uniqueness: true, length: { maximum: MAX_TITLE_LENGTH },
    format: { with: /([A-z0-9])/ }

  acts_as_list
end
