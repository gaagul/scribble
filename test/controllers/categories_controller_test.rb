# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_list_all_categories
    get categories_path, headers: headers
    assert_response :success
    response_body = response.parsed_body
    all_categories = response_body["categories"]

    total_categories_count = Category.count
    assert_equal all_categories.length, total_categories_count
   end

  def test_should_create_valid_category
    post categories_path,
      params: { category: { title: "Test" } },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_can_destroy_category
    delete category_path(@category.id), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_deleted", entity: "Category")
  end
end
