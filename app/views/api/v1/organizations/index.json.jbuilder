# frozen_string_literal: true

json.organization do
  json.extract! @organization,
    :id,
    :title,
    :is_password_enabled,
    :password
end
