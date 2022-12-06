# frozen_string_literal: true

require "test_helper"

class Api::V1::SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @category = create(:category, organization: @organization)
    @user = create(:user, organization: @organization)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article, new_status: "Draft")
  end

  def test_should_list_all_schedules
    get api_v1_article_schedules_path(@article.id), headers: headers
    assert_response :success
    total_schedules_count = @article.schedules.count
    response_json = parse_body
    assert_equal total_schedules_count, response_json["schedules"].length
  end

  def test_create_valid_schedule
    post api_v1_article_schedules_path(@article.id),
      params: { schedule: { article: @article, new_status: "Published", scheduled_at: DateTime.now + 1.day } },
      headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal t("successfully_created", entity: "Schedule"), response_json["notice"]
  end

  def test_destroy_schedule
    assert_difference "Schedule.count", -1 do
      delete api_v1_article_schedule_path(@article.id, @schedule.id), headers: headers
    end
    assert_response :ok
  end
end
