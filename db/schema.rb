# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_11_30_091206) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "body"
    t.string "slug"
    t.bigint "category_id", null: false
    t.bigint "user_id", null: false
    t.integer "status", default: 0, null: false
    t.integer "visits_count", default: 0
    t.integer "position"
    t.index ["category_id"], name: "index_articles_on_category_id"
    t.index ["position"], name: "index_articles_on_position"
    t.index ["slug"], name: "index_articles_on_slug", unique: true
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "position"
    t.bigint "organization_id", null: false
    t.index ["organization_id"], name: "index_categories_on_organization_id"
    t.index ["title"], name: "index_categories_on_title", unique: true
  end

  create_table "organizations", force: :cascade do |t|
    t.string "title", null: false
    t.boolean "is_password_enabled", default: false, null: false
    t.string "authentication_token"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "redirections", force: :cascade do |t|
    t.string "from"
    t.string "to"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "organization_id", null: false
    t.index ["from"], name: "index_redirections_on_from", unique: true
    t.index ["organization_id"], name: "index_redirections_on_organization_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "organization_id", null: false
    t.index ["organization_id"], name: "index_users_on_organization_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  create_table "visits", force: :cascade do |t|
    t.bigint "article_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_visits_on_article_id"
  end

  add_foreign_key "articles", "categories"
  add_foreign_key "articles", "users"
  add_foreign_key "categories", "organizations"
  add_foreign_key "redirections", "organizations"
  add_foreign_key "users", "organizations"
  add_foreign_key "visits", "articles"
end
