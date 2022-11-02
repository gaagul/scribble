# frozen_string_literal: true

json.articles do
  json.draft_count @draft_articles.count
  json.published_count @published_articles.count
  json.all @filtered_articles.order(updated_at: :desc) do | article |
    json.partial! "api/v1/articles/article", article: article
  end
end
