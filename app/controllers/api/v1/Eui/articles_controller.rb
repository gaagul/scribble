# frozen_string_literal: true

class Api::V1::Eui::ArticlesController < Api::V1::BaseController
  include Authenticable
  before_action :load_article!, only: %i[show]
  before_action :increment_view_count, only: %i[show]

  def index
    @articles = current_organization.articles.title_search(params[:search_title].downcase).where(status: :Published)
  end

  def show
    render
  end

  private

    def load_article!
      unless (@article = current_organization.articles.find_by(slug: params[:slug]))
        respond_with_error(t("article.not_found"), :not_found)
      end
    end

    def increment_view_count
      @article.visits.create!
    end
end
