# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    cycle = CyclicRedirectionCheckService.new(
      "/#{redirection_params[:from]}",
      "/#{redirection_params[:to]}"
    ).call || false
    if cycle
      respond_with_error("Redirection cycle deteced")
    else
      respond_with_success(t("successfully_created", entity: "Redirection"))
    end
  end

  def update
    @redirection.update!(from: "#{redirection_params[:from]}", to: "#{redirection_params[:to]}")
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
