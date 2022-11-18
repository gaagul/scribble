# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
    @redirection = build(:redirection, organization: @organization)
  end

  def test_redirection_to_not_nil
    @redirection.to = ""
    assert_not @redirection.valid?
  end

  def test_redirection_from_not_nil
    @redirection.from = ""
    assert_not @redirection.valid?
  end

  def test_from_to_not_same
    redirection = Redirection.new(from: "public", to: "public", organization: @organization)
    assert_not redirection.valid?
  end

  def test_from_unique
    first_redirection = Redirection.create!(from: "public", to: "welcome", organization: @organization)
    second_redirection = Redirection.create(from: "public", to: "test", organization: @organization)
    assert_includes second_redirection.errors.full_messages, "From has already been taken"
  end

  def test_does_not_form_a_cycle_while_create
    first_redirection = Redirection.create!(from: "public", to: "welcome", organization: @organization)
    second_redirection = Redirection.create(from: "welcome", to: "public", organization: @organization)
    assert_includes second_redirection.errors.full_messages, t("redirection.creates_loop")
  end

  def test_does_not_form_a_cycle_while_update
    first_redirection = Redirection.create!(from: "public", to: "welcome", organization: @organization)
    second_redirection = Redirection.create!(from: "welcome", to: "new", organization: @organization)
    second_redirection.to = "public"
    second_redirection.save
    assert_includes second_redirection.errors.full_messages, t("redirection.creates_loop")
  end

  def test_cannot_create_redirection_without_association
    redirection = Redirection.new(from: "public", to: "welcome", organization: nil)
    assert_not redirection.valid?
  end
end
