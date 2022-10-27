# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @user = create(:user)
    @organization = create(:organization)
    @article = create(:article, category: @category, user: @user, organization: @organization)
  end

  def test_should_list_all_articles
    get articles_path, params: { category_ids: nil, status: "all", search_title: "" }, headers: headers
    assert_response :success
    response_body = response.parsed_body
    all_articles = response_body["articles"]["all"]
    total_articles_count = Article.count
    assert_equal all_articles.length, total_articles_count
   end

  def test_should_create_valid_category
    post articles_path,
      params: { article: { title: "Test", status: "Published", category_id: @category.id } },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_destroy_redirection
    assert_difference "Article.count", -1 do
      delete article_path(@article.id), headers: headers
    end
    assert_response :ok
  end

  def test_should_update_article_details
    put article_path(@article.id), params: { title: "Welcome" }, as: :json, headers: headers
    assert_response :success
    @article.reload
    assert_equal @article.title, "Welcome"
  end
end
