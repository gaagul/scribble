# frozen_string_literal: true

class Api::V1::Articles::ReportsController < Api::V1::BaseController
  def create
    ReportsWorker.perform_async(current_user.id)
  end

  def download
    unless current_user.report.attached?
      respond_with_error(t("not_found", entity: "report"), :not_found) and return
    end

    send_data current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def pdf_file_name
      "scribble_articles_report.pdf"
    end
end
