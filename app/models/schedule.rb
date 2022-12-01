# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  enum new_status: { Draft: 0, Published: 1 }
end
