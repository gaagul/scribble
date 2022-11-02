# frozen_string_literal: true

require "test_helper"

class Api::V1::Eui::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
    @category = create(:category)
    @new_category = create(:category)
    create(:article, organization: @organization, user: @user, category: @category)
    create(:article, organization: @organization, user: @user, category: @category)
    create(:article, organization: @organization, user: @user, category: @category, status: "Draft")
    @organization_header = headers(@organization)
  end

  def test_lists_only_published_articles
    get api_v1_eui_categories_path, headers: @organization_header
    assert_response :success
    response_json = parse_body
    assert_equal response_json["categories"][0]["articles"].length, 2
  end

  def test_lists_only_categories_with_published_articles
    create(:article, organization: @organization, user: @user, category: @category, status: "Draft")
    create(:article, organization: @organization, user: @user, category: @new_category, status: "Draft")
    create(:article, organization: @organization, user: @user, category: @new_category, status: "Draft")
    get api_v1_eui_categories_path, headers: @organization_header
    assert_response :success
    response_json = parse_body
    assert_equal response_json["categories"].length, 1
  end
end
