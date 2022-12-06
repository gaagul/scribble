# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
    @category = build(:category, organization: @organization)
    @user = build(:user, organization: @organization)
    @article = create(:article, title: "new", category: @category, user: @user)
    @schedule = build(:schedule, article: @article, new_status: "Draft", scheduled_at: DateTime.now + 1.day)
  end

  def test_schedule_new_status_not_nil
    @schedule.new_status = ""
    assert_not @schedule.valid?
  end

  def test_schedule_schedule_at_not_nil
    @schedule.scheduled_at = ""
    assert_not @schedule.valid?
  end

  def test_first_schedule_status_different_from_article_status
    @schedule.new_status = @article.status
    assert_not @schedule.valid?
  end
end
