# frozen_string_literal: true

require "test_helper"

class SessionsControllerTests < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user)
  end

  def test_should_login_user_with_valid_credentials
    post session_path, params: { password: @organization.password }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @organization.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post session_path, params: { login: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.incorrect_credentials")
  end
end
