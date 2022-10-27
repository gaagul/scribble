# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    title { Faker::Lorem.sentence[0..14] }
    is_password_enabled { true }
    password { "Welcome1" }
  end
end
