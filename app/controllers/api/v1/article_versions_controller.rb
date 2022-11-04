# frozen_string_literal: true

class Api::V1::ArticleVersionsController < Api::V1::BaseController
  before_action :load_versions!, only: %i[index]
  before_action :load_article!, only: %i[update]

  def index
    render
  end

  private

    def load_versions!
      @versions = Article.find(params[:article_id]).versions
    end
end
