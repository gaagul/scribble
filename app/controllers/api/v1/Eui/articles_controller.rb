# frozen_string_literal: true

class Api::V1::Eui::ArticlesController < Api::V1::BaseController
  include Authenticable
  before_action :load_article!, only: %i[show]

  def index
    @articles = current_organization.articles.title_search(params[:search_title].downcase).where(status: :Published)
  end

  def show
    render
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
