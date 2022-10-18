# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, except: %i[index create]

  def index
    articles = Article.all.order(updated_at: :desc)
    @all_articles = articles
    @draft_articles = articles.where(status: :draft)
    @published_articles = articles.where(status: :published)
  end

  def show
  end

  def create
    Article.create!(article_params)
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
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :author, :status, :category_id, :body)
    end
end
