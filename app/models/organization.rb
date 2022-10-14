# frozen_string_literal: true

class Organization < ApplicationRecord
  has_secure_password

  validates :title, prsence: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
