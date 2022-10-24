# frozen_string_literal: true

class AddEnumToArticles < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :status
    add_column :articles, :status, :integer, default: 0, null: false
  end
end
