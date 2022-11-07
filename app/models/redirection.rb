# frozen_string_literal: true

class Redirection < ApplicationRecord
  include ActiveModel::Validations

  validates :from, presence: true, uniqueness: true
  validates :to, presence: true
  validates_with RedirectionCycleValidator

  private

    def to_and_from_validation
      errors.add(:base, t("redirection.same_path")) if from == to
    end
end
