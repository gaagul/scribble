# frozen_string_literal: true

json.articles do
  json.all @all_articles do | article |
    json.partial! "api/v1/articles/article", article: article
  end
end
