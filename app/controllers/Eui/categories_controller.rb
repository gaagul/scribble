# frozen_string_literal: true

class Eui::CategoriesController < ApplicationController
  def index
    @categories = Category.joins(:articles).where(articles: { status: "published" }).group("id").order("position")
  end
end
