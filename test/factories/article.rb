# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :user, Factory: :user
    association :category, Factory: :category
    title { Faker::Lorem.sentence[0..14] }
    body { Faker::Lorem.paragraph }
    status { "Published" }
  end
end
