# frozen_string_literal: true

json.schedules @schedules do | schedule |
  json.extract! schedule,
    :id,
    :new_status
  json.scheduled_at schedule.scheduled_at.in_time_zone('Mumbai').strftime('%Y-%m-%d %H:%M:%S')
end
