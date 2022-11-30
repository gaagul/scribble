# frozen_string_literal: true

class AddOrganizationToCategory < ActiveRecord::Migration[6.1]
  def change
    add_reference :categories, :organization, null: false, foreign_key: true
  end
end
