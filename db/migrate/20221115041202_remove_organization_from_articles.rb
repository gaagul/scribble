# frozen_string_literal: true

class RemoveOrganizationFromArticles < ActiveRecord::Migration[6.1]
  def change
    remove_reference :articles, :organization, foreign_key: true
  end
end
