# frozen_string_literal: true

class AddCategoryToArticles < ActiveRecord::Migration[6.1]
  def change
    add_reference :articles, :category, null: false, foreign_key: true
    change_column_null :articles, :title, false
    change_column_null :articles, :slug, false
  end
end
