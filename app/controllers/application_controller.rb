# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  before_action :current_organization
  before_action :current_user

  private

    def current_user
      @_current_user ||= User.first
    end

    def current_organization
      @_current_organization ||= Organization.first
    end
end
