# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    association :article, Factory: :article
    scheduled_at { DateTime.now }
    new_status { "Published" }
  end
end
