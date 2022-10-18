# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :delete_all
  acts_as_list
  validates :title, presence: true

  before_destroy :reassign_category

  private

    def reassign_category
    end
end
