# frozen_string_literal: true

json.id article.id
json.title article.title
json.slug article.slug
json.date article.created_at.strftime("%B %d, %Y")
json.status article.status
json.body article.body
json.author article.user.name
json.category do
  json.extract! article.category,
    :id,
    :title,
    :position
end
