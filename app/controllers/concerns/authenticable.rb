# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token
  end

  private

    def authenticate_user_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      is_valid_token = current_organization && auth_token && ActiveSupport::SecurityUtils.secure_compare(
        current_organization.authentication_token, auth_token)
      unless !current_organization.is_password_enabled? || is_valid_token
        respond_with_error(t("session.could_not_authenticate"), :unauthorized)
      end
    end
end
