# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @redirection = create(:redirection, from: "welcome", to: "public", organization: @organization)
  end

  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_get_successfully_redirected_from_url
    get "/#{@redirection.from}"
    assert_equal response["Location"].split("/").pop(), @redirection.to
  end
end
