# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true
  validates :to, presence: true
  validate :to_and_from_validation

  after_save :check_cycle

  private

    def to_and_from_validation
      errors.add(:base, "TO and FROM paths must be different") if from == to
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
          errors.add(:base, "Redirection creates a loop, Hence rejected.")
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
