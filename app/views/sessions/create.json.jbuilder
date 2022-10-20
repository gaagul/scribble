json.extract! @_current_organization,
  :id,
  :title,
  :authentication_token
json.user @_current_user.name
