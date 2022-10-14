# frozen_string_literal: true

class CreateOrganization < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations do |t|
      t.string :title, null: false
      t.boolean "is_password_enabled", default: false, null: false
      t.string "authentication_token"
      t.string :password
      t.timestamps
    end
  end
end
