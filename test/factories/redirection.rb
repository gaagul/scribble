# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    association :organization, Factory: :organization
    to { Faker::Lorem.sentence[0..14] }
    from { Faker::Lorem.sentence[0..14] }
  end
end
