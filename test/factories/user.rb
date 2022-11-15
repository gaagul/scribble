# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association :organization, Factory: :organization
    name { Faker::Name.name }
  end
end
