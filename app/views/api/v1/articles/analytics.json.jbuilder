# frozen_string_literal: true

json.analytics do
  json.visits @articles.each do | article |
    json.extract! article,
      :id,
      :title,
      :slug
    json.visits article.visits.group_by_day(:created_at, format: "%B %d, %Y").count do | date, count |
      unless count.zero?
        json.date date
        json.count count
      end
    end
    json.date article.updated_at.strftime("%B %d, %Y")
    json.category article.category.title
    json.count article.visits.count
  end
  json.count @all_articles.count
  json.page_size Article::MAX_ARTICLES_COUNT
end
