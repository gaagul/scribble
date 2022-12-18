# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 35

  belongs_to :organization

  has_one_attached :report
  has_many :articles, dependent: :destroy

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
