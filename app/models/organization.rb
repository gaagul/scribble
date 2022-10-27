# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 15

  has_many :articles, dependent: :delete_all

  validates :title, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :password, length: { minimum: 6 },
    format: { with: /\A(.*)(?=.*[0-9])(?=.*[a-zA-Z])(.*)\z/ },
    if: -> { is_password_enabled && password.present? }

  has_secure_token :authentication_token
  has_secure_password
end
