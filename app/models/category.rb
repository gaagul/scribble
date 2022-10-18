# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :delete_all
  acts_as_list
  validates :title, presence: true
end
