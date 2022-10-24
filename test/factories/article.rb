# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :organization, Factory: :organization
    association :user, Factory: :user
    association :category, Factory: :category
    title { Faker::Name.name }
    body { Faker::Lorem.paragraph }
    status { "Published" }
  end
end
