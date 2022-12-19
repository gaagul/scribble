 # frozen_string_literal: true

 require "test_helper"

 class Api::V1::Articles::ReportsControllerTest < ActionDispatch::IntegrationTest
   def setup
     @organization = create(:organization, is_password_enabled: true, password: "Welcome1")
     @user = create(:user, organization: @organization)
   end

   def test_should_be_able_to_download_report
     post api_v1_report_path, headers: headers
     get download_api_v1_report_path, headers: headers
     assert_response :success

     assert_equal "scribble_articles_report.pdf",
       response.headers["Content-Disposition"].split("filename=")[1].split("\;")[1].split("''")[1]
   end

   def test_should_respond_with_error_when_the_user_has_no_report_attached
     get download_api_v1_report_path, headers: headers
     assert_response :not_found
     response_json = parse_body
     assert_equal t("not_found", entity: "report"), response_json["error"]
   end
 end
