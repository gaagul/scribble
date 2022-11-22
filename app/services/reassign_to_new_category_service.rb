# frozen_string_literal: true

class ReassignToNewCategoryService
  attr_reader :category, :articles, :all_count, :new_category_id, :article_ids
  def initialize(category, new_category_id)
    @category = category
    @article_ids = @category.articles.pluck(:id)
    @all_count = Category.all.count
    @new_category_id = new_category_id.to_i
  end

  def process
    reassign_category
  end

  private

    def reassign_category
      if new_category_id != 0
        category.articles.where(id: article_ids).update(category_id: new_category_id)
      else
        if_no_new_category_param
      end
    end

    def if_no_new_category_param
      unless category.title == "General"
        general_category = Category.create!(title: "General")
        category.articles.where(id: article_ids).update(category_id: general_category.id)
      end
    end
end
