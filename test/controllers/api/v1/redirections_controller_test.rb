# frozen_string_literal: true

require "test_helper"

class Api::V1::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
  end

  def test_should_list_all_redirections
    get api_v1_redirections_path, headers: headers
    assert_response :success
    response_json = parse_body
    total_redirections_count = Redirection.count
    assert_equal total_redirections_count, response_json["redirections"].length
   end

  def test_should_create_valid_redirection
    post api_v1_redirections_path,
      params: { redirection: { to: "welcome", from: "public" } },
      headers: headers
    assert_response :success
    response_json = parse_body
    assert_equal t("successfully_created", entity: "Redirection"), response_json["notice"]
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete api_v1_redirection_path(@redirection.id), headers: headers
    end
    assert_response :ok
  end

  def test_should_update_redirection_details
    put api_v1_redirection_path(@redirection.id), params: { to: "welcome", from: "public" }, as: :json, headers: headers
    assert_response :success
    @redirection.reload
    assert_equal "welcome", @redirection.to
    assert_equal "public", @redirection.from
  end
end
