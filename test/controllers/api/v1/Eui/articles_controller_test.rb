# frozen_string_literal: true

require "test_helper"

class Api::V1::Eui::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
    @category = create(:category)
    @article = create(:article, organization: @organization, user: @user, category: @category, status: "Published")
    @organization_header = headers(@organization)
  end

  def test_should_show_article
    get api_v1_eui_article_path(@article.slug), headers: @organization_header
    assert_response :success
    response_json = parse_body
    assert_equal response_json["article"]["id"], @article.id
  end

  def test_should_not_load_with_id
    get api_v1_eui_article_path(@article.id), headers: @organization_header
    response_json = parse_body
    assert_equal "Couldn't find Article", response_json["error"]
  end

  def test_should_list_all_published_articles
    create(:article, organization: @organization, user: @user, category: @category, status: "Draft")
    create(:article, organization: @organization, user: @user, category: @category, status: "Draft")
    create(:article, organization: @organization, user: @user, category: @category, status: "Published")
    get api_v1_eui_articles_path, params: { search_title: "" }, headers: @organization_header
    assert_response :success
    response_json = parse_body
    published_count = Article.where(status: :Published).count
    assert_equal published_count, response_json["articles"].count
  end
end
