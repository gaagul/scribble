# frozen_string_literal: true

class AddBodyandSlugToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :body, :text
    add_column :articles, :author, :string
    add_column :articles, :slug, :string
    add_index :articles, :slug, unique: true
  end
end
