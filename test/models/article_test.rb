# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
    @category = build(:category, organization: @organization)
    @user = build(:user, organization: @organization)
    @article = build(:article, title: "new", category: @category, user: @user)
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors_to_sentence, "Category must exist"
  end

  def test_article_should_not_be_valid_without_user
    @article.user = nil
    assert_not @article.save
    assert_includes @article.errors_to_sentence, "User must exist"
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first_article = Article.create!(
      title: "test article", body: "This is a test article body",
      user: @user, category: @category, status: :Published)
    second_article = Article.create!(
      title: "test article", body: "This is a test article body",
      user: @user, category: @category, status: :Published)

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    first_article = Article.create!(
      title: "test-article", body: "This is a test article body",
      user: @user, category: @category, status: "Published")
    second_article = Article.create!(
      title: "test-article", body: "This is a test article body",
      user: @user, category: @category, status: "Published")
    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_article = Article.create!(
      title: "another test article", body: "This is a test article body",
      user: @user, category: @category, status: "Published")
    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end

    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("article.slug.immutable"), error_msg
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "testarticle"
    body = "This is a test article body"
    first_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, status: "Published")
    second_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, status: "Published")
    third_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, status: "Published")
    fourth_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, status: "Published")
    assert_equal fourth_article.slug, "#{title.parameterize}-4"

    third_article.destroy

    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(
      title: title, body: body, user: @user,
      category: @category, status: "Published")
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    body = "This is a test article body"
    title_with_numbered_substring = "buy 2 apples"

    existing_Article = Article.create!(
      title: title_with_numbered_substring, body: body, user: @user,
      category: @category, status: "Published")
    assert_equal title_with_numbered_substring.parameterize, existing_Article.slug

    substring_of_existing_slug = "buy"
    new_Article = Article.create!(
      title: substring_of_existing_slug, body: body, user: @user,
      category: @category, status: "Published")

    assert_equal substring_of_existing_slug.parameterize, new_Article.slug
  end

  def test_testing_category_filter_scope
    body = "This is a test article body"
    @category_2 = build(:category, organization: @organization)
    first_article = Article.create!(
      title: "A1", body: body, user: @user,
      category: @category_2, status: "Published")
    second_article = Article.create!(
      title: "A2", body: body, user: @user,
      category: @category_2, status: "Published")
    third_article = Article.create!(
      title: "A3", body: body, user: @user,
      category: @category, status: "Published")
    fourth_article = Article.create!(
      title: "A4", body: body, user: @user,
      category: @category, status: "Published")
    assert_equal Article.categories_filter([@category_2.id]).count, @category_2.articles.count
  end

  def test_status_filter_scope
    body = "This is a test article body"
    @category_2 = build(:category, organization: @organization)
    first_article = Article.create!(
      title: "A1", body: body, user: @user,
      category: @category_2, status: "Published")
    second_article = Article.create!(
      title: "A2", body: body, user: @user,
      category: @category_2, status: "Published")
    third_article = Article.create!(
      title: "A3", body: body, user: @user,
      category: @category, status: "Published")
    fourth_article = Article.create!(
      title: "A4", body: body, user: @user,
      category: @category, status: "Published")
    assert_equal Article.status_filter("Published").count, Article.Published.count
  end

  def test_title_search_filter_scope
    body = "This is a test article body"
    @category_2 = build(:category, organization: @organization)
    first_article = Article.create!(
      title: "t", body: body, user: @user,
      category: @category_2, status: "Published")
    second_article = Article.create!(
      title: "te", body: body, user: @user,
      category: @category_2, status: "Published")
    third_article = Article.create!(
      title: "tes", body: body, user: @user,
      category: @category, status: "Published")
    fourth_article = Article.create!(
      title: "test1", body: body, user: @user,
      category: @category, status: "Published")
    assert_equal Article.title_search("t").count, Article.where("title LIKE ?", "%t%").count
  end
end
