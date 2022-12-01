# frozen_string_literal: true

class Api::V1::ArticleVersionsController < Api::V1::BaseController
  before_action :load_versions!, only: %i[index]

  def index
    render
  end

  private

    def load_versions!
      @versions = current_user.articles.find(params[:article_id]).versions.reverse
    end
end
