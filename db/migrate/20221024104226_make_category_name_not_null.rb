# frozen_string_literal: true

class MakeCategoryNameNotNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null :categories, :title, false
 end
end
