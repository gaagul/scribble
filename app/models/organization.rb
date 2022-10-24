# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :articles, dependent: :delete_all
  MAX_NAME_LENGTH = 15

  has_secure_password
  has_secure_token :authentication_token

  validates :title, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
