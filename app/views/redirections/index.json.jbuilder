
json.redirections @redirections do | redirection |
  json.extract! redirection,
    :id,
    :to,
    :from
end
