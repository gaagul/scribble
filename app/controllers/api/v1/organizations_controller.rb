# frozen_string_literal: true

class Api::V1::OrganizationsController < Api::V1::BaseController
  def index
    render
  end

  def update
    current_organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:id, :title, :password, :is_password_enabled)
    end
end
