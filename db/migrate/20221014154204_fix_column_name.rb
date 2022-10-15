# frozen_string_literal: true

class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :organizations, :password, :password_digest
  end
end
