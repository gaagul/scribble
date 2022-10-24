# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_TITLE_LENGTH = 15

  has_many :articles, dependent: :delete_all
  acts_as_list
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
end
