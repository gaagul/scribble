# frozen_string_literal: true

class Eui::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]

  def index
    @published_articles = articles.where(status: :published)
  end

  def show
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
      end
end
