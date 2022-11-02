# frozen_string_literal: true

require "test_helper"

class Api::V1::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
  end

  def test_list_all_organizations
    get api_v1_organizations_path, headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal response_json["organization"]["title"], @organization.title
  end

  def test_should_update_organization_details
    put api_v1_organization_path(@organization.id), params: { title: "Welcome" }, as: :json, headers: headers
    assert_response :success
    @organization.reload
    assert_equal @organization.title, "Welcome"
  end
end
