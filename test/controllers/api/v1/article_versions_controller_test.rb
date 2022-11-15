# frozen_string_literal: true

require "test_helper"

class Api::V1::ArticleVersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_should_list_all_article_versions
    article = create(:article, category: @category, user: @user)
    article.update!(title: "Test")
    article.update!(title: "Test1")
    article.update!(title: "Test2")
    get api_v1_article_versions_path(article.id), headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal article.versions.count - 1, response_json["versions"].length
  end
end
