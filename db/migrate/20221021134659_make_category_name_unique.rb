# frozen_string_literal: true

class MakeCategoryNameUnique < ActiveRecord::Migration[6.1]
  def change
    add_index :categories, :title, unique: true
  end
end
