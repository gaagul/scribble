# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @organization = Organization.first
    unless @organization.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
