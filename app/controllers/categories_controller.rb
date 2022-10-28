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
    respond_with_success(t("successfully_updated", entity: "Category")) unless params.key?(:quiet)
  end

  def destroy
    DeleteCategoryService.new(@category, params[:new_category_id]).call unless @category.articles.count == 0
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
end
