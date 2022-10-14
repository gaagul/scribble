# frozen_string_literal: true

class AddChangeColumnNullToPAssword < ActiveRecord::Migration[6.1]
  def change
    change_column_null :organizations, :password, false
  end
end
