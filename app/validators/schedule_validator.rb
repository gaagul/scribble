# frozen_string_literal: true

class ScheduleValidator < ActiveModel::Validator
  include ActionView::Helpers::TranslationHelper

  def validate(record)
    @new_status = record.new_status
    @new_schedule = record.scheduled_at
    @article = record.article
    @previous_schedule = find_previous_schedule
    @next_schedule = find_next_schedule
    check_schedule_validity(record)
  end

  private

    def find_previous_schedule
      @article.schedules.where("scheduled_at < ?", @new_schedule).order(scheduled_at: :desc).first
    end

    def find_next_schedule
      @article.schedules.where("scheduled_at > ?", @new_schedule).order(scheduled_at: :asc).first
    end

    def check_article_schedule(record)
      if @new_status == @article.status
        record.errors.add(:base, t("schedule.same_state", entity: @article.title)) and return
      end
    end

    def check_schedule_validity(record)
      check_article_schedule(record) and return if @article.schedules.empty? || @previous_schedule.nil?
      if @previous_schedule && @previous_schedule.new_status == @new_status
        record.errors.add(
          :base,
          t("schedule.same_status", entity: @previous_schedule.scheduled_at.in_time_zone("Mumbai"))) and return
      end
      if @next_schedule && @next_schedule.new_status == @new_status
        record.errors.add(
          :base,
          t("schedule.same_status", entity: @next_schedule.scheduled_at.in_time_zone("Mumbai"))) and return
      end
    end
end
