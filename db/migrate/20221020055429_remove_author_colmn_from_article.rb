# frozen_string_literal: true

class RemoveAuthorColmnFromArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :author, :string
  end
end
