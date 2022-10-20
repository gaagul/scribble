
json.organization do
  json.extract! @current_organization,
    :id,
    :title,
    :is_password_enabled,
    :password
end
