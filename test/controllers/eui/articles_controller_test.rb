# frozen_string_literal: true

require "test_helper"

class Eui::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
    @category = create(:category)
    @article = create(:article, organization: @organization, user: @user, category: @category, status: "Published")
    @organization_header = headers(@organization)
  end

  def test_should_show_article
    get eui_article_path(@article.slug), headers: @organization_header
    assert_response :success
    assert_equal parse_body["article"]["id"], @article.id
  end

  def test_should_not_load_with_id
    get eui_article_path(@article.id), headers: @organization_header
    assert_equal "Couldn't find Article", parse_body["error"]
  end
end
