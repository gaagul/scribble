# frozen_string_literal: true

class Api::V1::Eui::CategoriesController < Api::V1::BaseController
  include Authenticable

  def index
    @categories = Category.includes(:articles).where(
      articles: {
        status: :Published,
        organization: current_organization
      }).order("position")
  end
end
