
json.organization do
  json.extract! @_current_organization,
    :id,
    :title,
    :is_password_enabled,
    :password
end
