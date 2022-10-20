json.extract! @current_organization,
  :id,
  :title,
  :authentication_token
json.user @current_user.name
