# frozen_string_literal: true

json.articles @articles do | article |
  json.extract! article,
    :id,
    :title,
    :slug
end
