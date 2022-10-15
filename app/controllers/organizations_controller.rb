# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_organization!, only: %i[update index]

  def index
  end

  def update
    @organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: "Organization"))
  end

  private

    def load_organization!
      @organization = Organization.first
    end

    def organization_params
      params.require(:organization).permit(:id, :title, :password, :is_password_enabled)
    end
end
