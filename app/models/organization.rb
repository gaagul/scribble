# frozen_string_literal: true

class Organization < ApplicationRecord
  has_secure_password

  validates :title, presence: true
  validates :password, length: { minimum: 6 }, if: -> { is_password_enabled && password.present? }
end
