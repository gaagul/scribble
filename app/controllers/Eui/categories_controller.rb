# frozen_string_literal: true

class Eui::CategoriesController < ApplicationController
  include Authenticable

  def index
    @categories = Category.includes(:articles).where(
      articles: {
        status: :Published,
        organization: @_current_organization
      }).order("position")
  end
end
