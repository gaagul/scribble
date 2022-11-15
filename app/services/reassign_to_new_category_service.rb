# frozen_string_literal: true

class ReassignToNewCategoryService
  attr_reader :category, :articles, :all_count, :new_category_id
  def initialize(category, new_category_id)
    @category = category
    @articles = @category.articles
    @all_count = Category.all.count
    @new_category_id = new_category_id.to_i
  end

  def process
    reassign_category
  end

  private

    def reassign_category
      if new_category_id != 0
        articles.update_all(category_id: new_category_id)
      else
        if_no_new_category_param
      end
    end

    def if_no_new_category_param
      unless category.title == "General"
        general_category = Category.create!(title: "General")
        articles.update_all(category_id: general_category.id)
      end
    end
end
