# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  def create
    unless current_organization.authenticate(login_params[:password])
      respond_with_error(t("session.incorrect_credentials"), :unauthorized)
    end
    @user = current_user
  end

  private

    def login_params
      params.permit(:password)
    end
end
