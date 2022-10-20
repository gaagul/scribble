# frozen_string_literal: true

class AddOrganizationToArticles < ActiveRecord::Migration[6.1]
  def change
    add_reference :articles, :organization, null: false, foreign_key: true
  end
end
