# frozen_string_literal: true

json.article do
  json.partial! "api/v1/articles/article", article: @article
  json.versions @article.versions do | version |
    unless version.reify.nil?
      json.partial! "api/v1/articles/article", article: version.reify
      json.extract! version,
        :event
    end
  end
end
