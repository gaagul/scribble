# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_TITLE_LENGTH = 20

  has_many :articles, dependent: :delete_all

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: /([A-z0-9])/ }

  acts_as_list
end
