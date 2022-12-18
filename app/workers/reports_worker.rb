# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id)
    ActionCable.server.broadcast(user_id, { message: t("report.render"), progress: 25 })
    current_user = User.find(user_id)
    articles = current_user.articles.includes(:category).status_filter("Published").order(visits_count: :desc)
    content = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/v1/articles/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: t("report.generate"), progress: 50 })
    pdf_blob = WickedPdf.new.pdf_from_string content
    ActionCable.server.broadcast(user_id, { message: t("report.upload"), progress: 75 })
    if current_user.report.attached?
      current_user.report.purge_later
    end
    current_user.report.attach(
      io: StringIO.new(pdf_blob), filename: "scribble_report.pdf",
      content_type: "application/pdf")
    current_user.save
    ActionCable.server.broadcast(user_id, { message: t("report.attach"), progress: 100 })
  end
end
