# frozen_string_literal: true

class RemovePasswordNullFromOrganization < ActiveRecord::Migration[6.1]
  def change
    change_column_null :organizations, :password_digest, true
  end
end
