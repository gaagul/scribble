# frozen_string_literal: true

json.id article.id
json.title article.title
json.slug article.slug
json.date article.updated_at.strftime("%B %d, %Y")
json.time article.updated_at.in_time_zone("Mumbai").strftime("%I:%M %p, %m/%d/%Y")
json.status article.status
json.body article.body
json.author article.user.name
json.category do
  unless article.category.nil?
    json.extract! article.category,
      :id,
      :title,
      :position
  end
end
