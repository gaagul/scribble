# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_list_all_categories
    get categories_path, headers: headers
    assert_response :success
    response_json = parse_body
    all_categories = response_json["categories"]
    total_categories_count = Category.count
    assert_equal all_categories.length, total_categories_count
   end

  def test_should_create_valid_category
    post categories_path,
      params: { category: { title: "Test" } },
      headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_should_destroy_redirection
    assert_difference "Category.count", -1 do
      delete category_path(@category.id), headers: headers
    end
    assert_response :ok
  end

  def test_should_update_category_details
    put category_path(@category.id), params: { title: "Welcome" }, as: :json, headers: headers
    assert_response :success
    @category.reload
    assert_equal @category.title, "Welcome"
  end
end
