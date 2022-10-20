# frozen_string_literal: true

class Eui::CategoriesController < ApplicationController
  def index
    @categories = Category.joins(:articles).where(
      articles: {
        status: "published", user_id: current_user.id,
        organization_id: current_organization.id
      }).group("id").order("position")
  end
end
