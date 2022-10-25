# frozen_string_literal: true

class DeleteCategoryService
  include ActionView::Helpers::TranslationHelper
  def initialize(category, new_category_id)
    @category = category
    @articles = @category.articles
    @all_count = Category.all.count
    @new_category_id = new_category_id
  end

  def call
    delete_category
  end

  private

    def delete_category
      if @new_category_id != 0
        @articles.update_all(category_id: @new_category_id)
      else
        no_new_category_param
      end
    end

    def no_new_category_param
      unless @category.title == "General"
        general_category = Category.create!(title: "General")
        @articles.update_all(category_id: general_category.id)
      end
    end
end
