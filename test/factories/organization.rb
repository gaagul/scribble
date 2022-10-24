# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    title { Faker::Lorem.sentence[0..14] }
    password { "Welcome1" }
  end
end
