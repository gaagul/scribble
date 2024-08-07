# frozen_string_literal: true

class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.references :article, null: false, foreign_key: true
      t.integer :new_status, null: false
      t.datetime :scheduled_at, null: false
      t.timestamps
    end
  end
end
