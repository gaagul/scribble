# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
    @category = build(:category, organization: @organization)
  end

  def test_category_should_not_be_valid_and_saved_without_title
    @category.title = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Title can't be blank"
   end

  def test_title_should_be_of_valid_length
    @category.title = "a" * (Category::MAX_TITLE_LENGTH + 1)
    assert @category.invalid?
  end

  def test_cannot_create_category_without_association
    category = Category.new(title: "category", organization: nil)
    assert_not category.valid?
  end
end
