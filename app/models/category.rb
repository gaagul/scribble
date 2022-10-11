# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles
  validates :title, presence: true
end
