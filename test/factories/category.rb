# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    title { Faker::Lorem.sentence[0..14] }
  end
end
