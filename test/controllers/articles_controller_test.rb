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
    total_articles_count = Article.count
    response_json = parse_body
    assert_equal response_json["articles"]["all"].length, total_articles_count
   end

  def test_should_create_valid_category
    post articles_path,
      params: { article: { title: "Test", status: "Published", category_id: @category.id } },
      headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_destroy_redirection
    assert_difference "Article.count", -1 do
      delete article_path(@article.id), headers: headers
    end
    assert_response :ok
  end

  def test_should_update_article_details
    @new_article = create(:article, category: @category, user: @user, organization: @organization)
    put article_path(@article.id), params: { title: "Welcome", body: @new_article.body, status: "Draft" }, as: :json,
      headers: headers
    assert_response :success
    @article.reload
    assert_equal @article.title, "Welcome"
    assert_equal @article.body, @new_article.body
  end

  def test_show_article_using_id
    get article_path(@article.id), headers: headers
    response_json = parse_body
    assert_equal response_json["article"]["id"], @article.id
  end
end
