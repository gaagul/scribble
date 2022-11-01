# frozen_string_literal: true

class Redirection < ApplicationRecord
  REG_EXP = /([A-z0-9])/

  validates :from, presence: true, uniqueness: true, format: { with: REG_EXP }
  validates :to, presence: true, format: { with: REG_EXP }
  validate :to_and_from_validation

  after_save :check_cycle

  private

    def to_and_from_validation
      errors.add(:base, t("redirection.same_path")) if from == to
    end

    def check_cycle
      @slow = to
      @fast = to

      while @fast != true do
        fast_jump
        if @fast != true
          slow_jump
        end
        if @fast == @slow
          errors.add(:base, t("redirection.creates_loop"))
          raise ActiveRecord::RecordInvalid.new(self)
        end
      end
    end

    def fast_jump
      first_destination = Redirection.where(from: @fast).empty? || Redirection.find_by!(from: @fast).to
      second_destination = true
      second_destination = (Redirection.where(from: first_destination).empty? ||
        Redirection.find_by!(from: first_destination).to) unless first_destination == true
      @fast = second_destination
    end

    def slow_jump
      @slow = Redirection.where(from: @slow).empty? || Redirection.find_by!(from: @slow).to unless @fast == @slow
    end
end
