# frozen_string_literal: true

class AddOrganizationToUser < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :organization, foreign_key: true, null: false
  end
end
