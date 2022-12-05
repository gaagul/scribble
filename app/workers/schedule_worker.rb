# frozen_string_literal: true

class ScheduleWorker
  include Sidekiq::Worker

  def perform
    schedule_service = ScheduleService.new
    schedule_service.process
  end
end
