# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :new_status, presence: true
  validates :scheduled_at, presence: true
  validates_with ScheduleValidator

  enum new_status: { Draft: 0, Published: 1 }
end
