json.versions @versions do | version |
  unless version.reify.nil?
    json.partial! "api/v1/articles/article", article: version.reify
    json.version_id version.id
    json.event version.event
  end
end
