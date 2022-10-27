# frozen_string_literal: true

class Eui::CategoriesController < ApplicationController
  include Authenticable
  def index
    @categories = Category.joins(:articles).where(
      articles: {
        status: :Published
      }).group("id").order("position")
  end
end
