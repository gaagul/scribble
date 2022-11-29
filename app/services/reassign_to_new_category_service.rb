# frozen_string_literal: true

class ReassignToNewCategoryService
  attr_reader :category, :articles, :all_count, :new_category_id, :article_ids
  attr_writer :new_category_id
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
        move_articles_to_new_category
      else
        if_no_new_category_param
      end
    end

    def if_no_new_category_param
      unless category.title == "General"
        new_category_id = Category.create!(title: "General").id
        move_articles_to_new_category
      end
    end

    def move_articles_to_new_category
      @articles.each do |article|
        article.reload
        article.update!(category_id: new_category_id)
      end
    end
end
