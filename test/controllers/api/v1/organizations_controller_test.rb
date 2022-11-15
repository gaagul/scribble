# frozen_string_literal: true

require "test_helper"

class Api::V1::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_list_all_organizations
    get api_v1_organizations_path, headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal @organization.title, response_json["organization"]["title"]
  end

  def test_should_update_organization_details
    put api_v1_organization_path(@organization.id), params: { organization: { title: "Welcome" } }, headers: headers
    assert_response :success
    @organization.reload
    assert_equal "Welcome", @organization.title
  end

  def test_shout_change_authentication_token_if_password_updated
    put api_v1_organization_path(@organization.id), params: { organization: { password: "Welcome2" } }, headers: headers
    assert_not_equal @organization.authentication_token, @organization.reload.authentication_token
  end
end
