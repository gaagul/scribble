# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, except: %i[index create]

  def index
    category_filtered_articles = current_user.articles.categories_filter(
      params[:category_ids]).title_search(params[:search_title].downcase
    )
    @filtered_articles = category_filtered_articles.status_filter(params[:status])
    @draft_articles = category_filtered_articles.where(status: :Draft)
    @published_articles = category_filtered_articles.where(status: :Published)
  end

  def show
    render
  end

  def create
    Article.create!(article_params.merge(organization: @_current_organization, user: @_current_user))
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "article"))
  end

  private

    def load_article!
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :status, :category_id, :body)
    end
end
