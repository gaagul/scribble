# frozen_string_literal: true

require "test_helper"

class Api::V1::Eui::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @new_category = create(:category)
    create(:article, user: @user, category: @category)
    create(:article, user: @user, category: @category)
    create(:article, user: @user, category: @category, status: "Draft")
    @organization_header = headers(@organization)
  end

  def test_lists_only_published_articles
    get api_v1_eui_categories_path, headers: @organization_header
    assert_response :success
    response_json = parse_body
    assert_equal Category.order("position").first.articles.Published.length,
      response_json["categories"][0]["articles"].length
  end

  def test_lists_only_categories_with_published_articles
    create(:article, user: @user, category: @category, status: "Draft")
    create(:article, user: @user, category: @new_category, status: "Draft")
    create(:article, user: @user, category: @new_category, status: "Draft")
    get api_v1_eui_categories_path, headers: @organization_header
    assert_response :success
    response_json = parse_body
    assert_equal 1, response_json["categories"].length
  end

  def test_should_not_list_categories_when_token_is_invalid
    get api_v1_eui_categories_path, headers: headers
    assert_response :unauthorized
    assert_equal t("session.could_not_authenticate"), parse_body["error"]
  end
end
