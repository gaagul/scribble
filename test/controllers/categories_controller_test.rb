# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @organization = create(:organization)
    @user = create(:user)
  end

  def test_should_list_all_categories
    get categories_path, headers: headers
    assert_response :success
    total_categories_count = Category.count
    response_json = parse_body
    assert_equal response_json["categories"].length, total_categories_count
   end

  def test_should_create_valid_category
    post categories_path,
      params: { category: { title: "Test" } },
      headers: headers
    assert_response :success
    assert_equal t("successfully_created", entity: "Category"), parse_body["notice"]
  end

  def test_should_update_category_details
    put category_path(@category.id), params: { title: "Welcome" }, as: :json, headers: headers
    assert_response :success
    @category.reload
    assert_equal @category.title, "Welcome"
  end

  def test_should_update_category_details
    put category_path(@category.id), params: { title: "Welcome" }, as: :json, headers: headers
    assert_response :success
    @category.reload
    assert_equal @category.title, "Welcome"
  end

  def test_should_update_category_details
    put category_path(@category.id), params: { title: "Welcome" }, as: :json, headers: headers
    assert_response :success
    @category.reload
    assert_equal @category.title, "Welcome"
  end

  def test_should_destroy_redirection
    assert_difference "Category.count", -1 do
      delete category_path(@category.id), headers: headers
    end
    assert_response :ok
  end

  def test_change_article_category_to_new_category_if_category_deleted
    @new_category = create(:category)
    article_1 = create(:article, category: @category, organization: @organization, user: @user)
    delete category_path(@category.id), params: { new_category_id: @new_category.id }, headers: headers
    assert_response :ok
    article_1.reload
    assert_equal article_1.category_id, @new_category.id
  end

  def test_create_a_general_category_when_last_category_with_articles_deleted
    article = create(:article, category: @category, organization: @organization, user: @user)
    delete category_path(@category.id), params: { new_category_id: 0 }, headers: headers
    article.reload
    assert_equal article.category.title, "General"
  end
end
