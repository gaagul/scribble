# frozen_string_literal: true

require "test_helper"

class Eui::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @user = create(:user)
    @organization = create(:organization)
    @article = create(:article, category: @category, user: @user, organization: @organization)
  end

  def test_should_show_article
    get eui_article_path(@article.slug), headers: headers
    assert_response :success
    response_json = response.parsed_body
    puts response_json
  end
end
