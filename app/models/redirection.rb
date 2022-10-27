# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true
  validates :to, presence: true
  validate :to_and_from_validation

  private

    def to_and_from_validation
      errors.add(:base, "TO and FROM paths must be different") if from == to
    end
end
