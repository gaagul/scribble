# frozen_string_literal: true

class SchedulesController < ApplicationController
  before_action :load_article!, only: %i[create update]
  before_action :load_schedule!, only: :destroy

  def create
    @article.schedules.create!(schedule_params)
  end

  def destroy
    @schedule.destroy!
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
