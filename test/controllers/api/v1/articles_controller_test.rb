# frozen_string_literal: true

require "test_helper"

class Api::V1::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @category = create(:category, organization: @organization)
    @user = create(:user, organization: @organization)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_articles
    get api_v1_articles_path, params: { category_ids: [@category.id] }, headers: headers
    assert_response :success
    total_articles_count = @category.articles.count
    response_json = parse_body
    assert_equal total_articles_count, response_json["articles"].length
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
    @new_article = create(:article, category: @category, user: @user)
    put api_v1_article_path(@article.id),
      params: { article: { title: "Welcome", body: @new_article.body, status: "Draft" } },
      headers: headers
    assert_response :success
    @article.reload
    assert_equal "Welcome", @article.title
    assert_equal @article.body, @new_article.body
  end

  def test_show_article_using_id
    get api_v1_article_path(@article.id), headers: headers
    response_json = parse_body
    assert_equal @article.id, response_json["article"]["id"]
  end

  def test_set_papertrail_event_as_restored_if_restored_params_is_true
    put api_v1_article_path(@article.id),
      params: { restore: true, article: { title: "Welcome" }, time: @article.updated_at },
      headers: headers
    time = @article.versions.last.event.split("-").last
    assert_response :success
    assert_equal @article.versions.last.event, "restore-#{@article.updated_at}"
    put api_v1_article_path(@article.id),
      params: { article: { title: "new" }, time: @article.updated_at },
      headers: headers
    assert_equal @article.versions.last.event, "Restored from #{time}"
  end

  def test_analytics_action
    article1 = create(:article, user: @user, category: @category, status: :Draft)
    article2 = create(:article, user: @user, category: @category, status: :Draft)
    article3 = create(:article, user: @user, category: @category, status: :Published)
    get analytics_api_v1_articles_path, params: { current_page: 1 }, headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal @user.articles.where(status: :Published).count, response_json["analytics"]["visits"].length
  end

  def test_table_list_action
    article1 = create(:article, user: @user, category: @category, status: :Draft)
    article2 = create(:article, user: @user, category: @category, status: :Draft)
    article3 = create(:article, user: @user, category: @category, status: :Published)
    get table_list_api_v1_articles_path, params: { current_page: 1, search_title: "", status: "all" }, headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal @user.articles.count, response_json["articles"]["all"].length
    assert_equal @user.articles.where(status: :Draft).count, response_json["articles"]["draft_count"]
    assert_equal @user.articles.where(status: :Published).count, response_json["articles"]["published_count"]
    assert_equal @user.articles.count, response_json["articles"]["total_count"]
  end

  def test_bulk_update
    article1 = create(:article, user: @user, category: @category, status: :Draft)
    article2 = create(:article, user: @user, category: @category, status: :Draft)
    article3 = create(:article, user: @user, category: @category, status: :Published)
    new_category = create(:category, organization: @organization)
    post bulk_update_api_v1_articles_path,
      params: { article_ids: [article1.id, article2.id], new_category_id: new_category.id },
      headers: headers
    assert_response :success
    assert_equal new_category.id, article1.reload.category_id
    assert_equal new_category.id, article2.reload.category_id
  end
end
