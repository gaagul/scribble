# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :slug,
  :body,
  :status,
  :position
json.date article.updated_at.in_time_zone("Mumbai").strftime("%B %d, %Y")
json.time article.updated_at.in_time_zone("Mumbai").strftime("%I:%M %p, %m/%d/%Y")
json.author article.user.name
json.category do
  unless article.category.nil?
    json.extract! article.category,
      :id,
      :title,
      :position
  end
end
