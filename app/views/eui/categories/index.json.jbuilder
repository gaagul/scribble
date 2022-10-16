# frozen_string_literal: true

json.categories @categories do | category |
  json.extract! category,
    :id,
    :title
  json.articles category.articles.where(articles: { status: "published" })
end
