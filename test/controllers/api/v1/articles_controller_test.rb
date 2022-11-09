# frozen_string_literal: true

require "test_helper"

class Api::V1::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @user = create(:user)
    @organization = create(:organization)
    @article = create(:article, category: @category, user: @user, organization: @organization)
  end

  def test_should_list_all_articles
    get api_v1_articles_path, params: { category_ids: nil, status: "all", search_title: "" }, headers: headers
    assert_response :success
    total_articles_count = @user.articles.count
    response_json = parse_body
    assert_equal response_json["articles"]["all"].length, total_articles_count
   end

  def test_should_create_valid_category
    post api_v1_articles_path,
      params: { article: { title: "Test", status: "Published", category_id: @category.id } },
      headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_destroy_redirection
    assert_difference "Article.count", -1 do
      delete api_v1_article_path(@article.id), headers: headers
    end
    assert_response :ok
  end

  def test_should_update_article_details
    @new_article = create(:article, category: @category, user: @user, organization: @organization)
    put api_v1_article_path(@article.id),
      params: { article: { title: "Welcome", body: @new_article.body, status: "Draft" } },
      headers: headers
    assert_response :success
    @article.reload
    assert_equal @article.title, "Welcome"
    assert_equal @article.body, @new_article.body
  end

  def test_show_article_using_id
    get api_v1_article_path(@article.id), headers: headers
    response_json = parse_body
    assert_equal response_json["article"]["id"], @article.id
  end

  def test_set_papertrail_event_as_restored_if_restored_params_is_true
    put api_v1_article_path(@article.id),
      params: { restore: true, article: { title: "Welcome" }, time: @article.updated_at },
      headers: headers
    assert_response :success
    byebug
    assert_equal @article.versions.last.event, "Restored from #{@article.updated_at}"
  end
end
