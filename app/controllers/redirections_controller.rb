# frozen_string_literal: true

class RedirectionsController < ActionController::Base
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    Redirection.create!(redirection_params)
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = Redirection.find_by!(id: params[:id])
    end
end
