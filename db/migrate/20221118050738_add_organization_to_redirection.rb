# frozen_string_literal: true

class AddOrganizationToRedirection < ActiveRecord::Migration[6.1]
  def change
    add_reference :redirections, :organization, null: false, foreign_key: true
  end
end
