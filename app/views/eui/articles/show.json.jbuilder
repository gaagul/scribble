# frozen_string_literal: true

json.article do
  json.extract! @article,
    :id,
    :title,
    :body
  json.date @article.created_at.strftime("%B %d, %Y")
  json.categoryTitle @article.category.title
  json.categoryPosition @article.category.position
end
