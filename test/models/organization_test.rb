# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_organization_should_not_be_valid_and_saved_without_title
    @organization.title = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Title can't be blank"
  end

  def test_title_should_be_of_valid_length
    @organization.title = "a" * (Organization::MAX_NAME_LENGTH + 1)
    assert @organization.invalid?
  end

  def test_organizations_should_have_unique_auth_token
    @organization.save!
    second_organization = build(:organization)
    assert_not_same @organization.authentication_token, second_organization.authentication_token
  end

  def test_validation_should_accept_valid_passwords
    valid_passwords = %w[Welcome1 Password1]
    valid_passwords.each do |password|
      @organization.password = password
      assert @organization.valid?
    end
  end

  def test_validation_should_reject_invalid_passwords
    invalid_passwords = %w[passworD @Password 1234]
    invalid_passwords.each do |password|
      @organization.password = password
      assert @organization.invalid?
    end
  end
end
