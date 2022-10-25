# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
    @category = build(:category)
    @organization = build(:organization)
    @article = build(:article, category: @category, user: @user, organization: @organization)
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first_article = Article.create!(
      title: "test article", body: "This is a test article body",
      user: @user, category: @category, organization: @organization, status: :Published)
    second_article = Article.create!(
      title: "test article", body: "This is a test article body",
      user: @user, category: @category, organization: @organization, status: :Published)

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    first_article = Article.create!(
      title: "test-article", body: "This is a test article body",
      user: @user, category: @category, organization: @organization)
    second_article = Article.create!(
      title: "test-article", body: "This is a test article body",
      user: @user, category: @category, organization: @organization)

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_article = Article.create!(
      title: "another test article", body: "This is a test article body",
      user: @user, category: @category, organization: @organization)
    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end

    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("article.slug.immutable"), error_msg
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    body = "This is a test article body"
    first_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, organization: @organization)
    second_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, organization: @organization)
    third_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, organization: @organization)
    fourth_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, organization: @organization)

    assert_equal fourth_article.slug, "#{title.parameterize}-4"

    third_article.destroy

    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, organization: @organization)
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    body = "This is a test article body"
    title_with_numbered_substring = "buy 2 apples"

    existing_Article = Article.create!(
      title: title_with_numbered_substring, body: body, user: @user,
      category: @category, organization: @organization)
    assert_equal title_with_numbered_substring.parameterize, existing_Article.slug

    substring_of_existing_slug = "buy"
    new_Article = Article.create!(
      title: substring_of_existing_slug, body: body, user: @user,
      category: @category, organization: @organization)

    assert_equal substring_of_existing_slug.parameterize, new_Article.slug
  end
end