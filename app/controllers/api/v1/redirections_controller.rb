# frozen_string_literal: true

class Api::V1::RedirectionsController < Api::V1::BaseController
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    current_organization.redirections.create!(from: "#{redirection_params[:from]}", to: "#{redirection_params[:to]}")
    respond_with_success(t("successfully_created", entity: "Redirection"))
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
      params.require(:redirection).permit(:id, :from, :to)
    end

    def load_redirection!
      @redirection = Redirection.find(params[:id])
    end
end
