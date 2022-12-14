# frozen_string_literal: true

class Api::V1::Eui::CategoriesController < Api::V1::BaseController
  include Authenticable

  def index
    @categories = Category.includes(:articles).where(
      articles: {
        status: :Published,
        user_id: current_organization.users.ids
      }).order("categories.position").order("articles.title")
  end
end
