# frozen_string_literal: true

class ArticleScheduleWorker
  include Sidekiq::Worker

  def perform(schedule)
    article = Article.find(schedule["article_id"])
    article.update!(status: schedule["new_status"])
    Schedule.find(schedule["id"]).destroy!
  end
end
