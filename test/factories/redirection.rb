# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    to { Faker::Lorem.sentence[0..14] }
    from { Faker::Lorem.sentence[0..14] }
  end
end
