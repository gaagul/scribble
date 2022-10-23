# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]

  def index
    @categories = Category.all.order(position: :ASC)
  end

  def create
    Category.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    @articles = @category.articles
    @all_count = Category.all.count
    unless @all_count == 1 && @category.title == "General"
      params[:new_category_id].present? ?
      (@articles.update_all(category_id: params[:new_category_id]) unless @articles.empty?) :
      ((no_new_category_param unless @articles.empty?) and return)
    end
    @category.destroy!
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:id, :title, :position)
    end

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end

    def no_new_category_param
      unless @all_count > 1
        general_category = Category.create!(title: "General")
        @articles.update_all(category_id: general_category.id)
        return
      end
      respond_with_error("please select a new category")
    end
end
