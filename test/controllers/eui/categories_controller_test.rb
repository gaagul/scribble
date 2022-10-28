# frozen_string_literal: true

require "test_helper"

class Eui::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
    @category = create(:category)
    @new_category = create(:category)
    @article_1 = create(:article, organization: @organization, user: @user, category: @category)
    @article_2 = create(:article, organization: @organization, user: @user, category: @category)
    @article_3 = create(:article, organization: @organization, user: @user, category: @category, status: "Draft")
    @organization_header = headers(@organization)
  end

  def test_lists_only_published_articles
    get eui_categories_path, headers: @organization_header
    assert_response :success
    response_body = response.parsed_body
    assert_equal response_body["categories"][0]["articles"].length, 2
  end

  def test_lists_only_categories_with_published_articles
    @article_4 = create(:article, organization: @organization, user: @user, category: @new_category, status: "Draft")
    @article_5 = create(:article, organization: @organization, user: @user, category: @new_category, status: "Draft")
    get eui_categories_path, headers: @organization_header
    assert_response :success
    response_body = response.parsed_body
    assert_equal response_body["categories"].length, 1
  end
end
