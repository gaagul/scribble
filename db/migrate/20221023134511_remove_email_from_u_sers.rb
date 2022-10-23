# frozen_string_literal: true

class RemoveEmailFromUSers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :email
  end
end
