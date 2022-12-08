# frozen_string_literal: true

class ScheduleService
  attr_reader :article_schedules

  def initialize
    @article_schedules = get_article_schedules
  end

  def process
    schedule_articles
  end

  private

    def get_article_schedules
      Schedule.where("scheduled_at <= ?", DateTime.now)
    end

    def schedule_articles
      @article_schedules.each do |schedule|
        ArticleScheduleWorker.perform_async(schedule.id)
      end
    end
end
