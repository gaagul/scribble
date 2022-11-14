# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    title { Faker::Alphanumeric.alphanumeric(number: 10) }
  end
end
