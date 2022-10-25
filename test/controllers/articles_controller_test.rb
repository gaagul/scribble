# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @user = create(:user)
    @organization = create(:organization)
    @article = create(:article, category: @category, user: @user, organization: @organization)
  end

  def test_shouldnt_create_article_without_title
    post articles_path, params: {
                          article:
                          {
                            title: "", body: "Learn Ruby",
                            user: @user, category_id: @category.id, status: "Published"
                          }

                        },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank and Title is invalid"
  end
end
