# frozen_string_literal: true

class AddIndexToArticlePosition < ActiveRecord::Migration[6.1]
  def change
    add_index :articles, :position
  end
end
