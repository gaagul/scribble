# frozen_string_literal: true

require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
  end

  def test_should_login_user_with_valid_credentials
    post api_v1_session_path, params: { password: @organization.password }, as: :json, headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal response_json["authentication_token"], @organization.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post api_v1_session_path, params: { login: { password: "invalid password" } }, as: :json, headers: headers
    assert_response :unauthorized
    response_json = parse_body
    assert_equal response_json["error"], t("session.incorrect_credentials")
  end
end
