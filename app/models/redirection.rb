# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true
  validates :to, presence: true
end
