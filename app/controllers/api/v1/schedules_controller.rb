# frozen_string_literal: true

class Api::V1::SchedulesController < Api::V1::BaseController
  before_action :load_article!, only: %i[create update index destroy]
  before_action :load_schedule!, only: :destroy

  def index
    @schedules = @article.schedules
  end

  def create
    @article.schedules.create!(schedule_params)
    respond_with_success(t("successfully_created", entity: "Schedule"))
  end

  def destroy
    @schedule.destroy!
    respond_with_success(t("successfully_deleted", entity: "schedule"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end

    def load_schedule!
      @schedule = @article.schedules.find(params[:id])
    end

    def schedule_params
      params.require(:schedule).permit(:new_status, :scheduled_at)
    end
end
