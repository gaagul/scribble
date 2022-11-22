# frozen_string_literal: true

class Api::V1::ArticlesController < Api::V1::BaseController
  before_action :load_article!, except: %i[analytics index create table_list bulk_update]
  before_action :set_event, only: %i[update]
  before_action :set_time, only: %i[update]
  before_action :set_paper_trail_whodunnit
  before_action :load_articles, only: :bulk_update
  before_action :set_category_and_status_filtered_articles, only: %i[table_list]

  def index
    @all_articles = current_user.articles.categories_filter(params[:category_ids]).order(position: :ASC)
  end

  def show
    render
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article")) unless params.key?(:quiet)
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "article"))
  end

  def analytics
    @all_articles = current_user.articles.status_filter(:Published).sorted
    @articles = @all_articles.page(params[:current_page])
  end

  def table_list
    @title_filtered_articles = @all_articles.title_search(params[:search_title].downcase)
    @filtered_articles = @title_filtered_articles.page(params[:current_page])
    @draft_articles = @title_filtered_articles.where(status: :Draft)
    @published_articles = @title_filtered_articles.where(status: :Published)
  end

  def bulk_update
    records_size = @articles.size
    @articles.where(id: params[:article_ids]).update(category_id: params[:new_category_id])
    respond_with_success(
      t(
        "successfully_updated", count: records_size,
        entity: records_size > 1 ? "Articles" : "Article"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_articles
      @articles = current_user.articles.where(id: params[:article_ids])
      respond_with_error(t("not_found", entity: "Articles")) if @articles.empty?
    end

    def article_params
      params.require(:article).permit(:title, :status, :category_id, :body, :position)
    end

    def set_event
      if params.key?(:restore)
        @article.paper_trail_event = "restore-#{params[:time]}"
      end
    end

    def set_time
      if @article.versions.last.event.start_with?("restore")
        @article.paper_trail_event = "Restored from #{@article.versions.last.event.split('-').last}"
        @article.versions.last.event = "updated"
      end
    end

    def set_category_and_status_filtered_articles
      @category_filtered_articles = current_user.articles.categories_filter(
        params[:category_ids])
      @all_articles = @category_filtered_articles.status_filter(params[:status]).order(position: :ASC)
    end
end
