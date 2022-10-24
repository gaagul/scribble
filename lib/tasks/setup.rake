desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  create_organization! title: "Spinkart"
  create_user! name: "Oliver Smith"
  create_category! title: "Getting Started"
  create_category! title: "Apps & Integration"
  create_category! title: "Security & Privacy"
  create_category! title: "Misc"
  create_article! title: "Welcome to Scribble", category_id: 1, status: "Published"
  create_article! title: "Welcome to Scribble draft", category_id: 1, status: "Draft"
  create_article! title: "Setting Up", category_id: 2, status: "Published"
  create_article! title: "Setting Up draft", category_id: 2, status: "Draft"
  create_article! title: "Writing an article", category_id: 3, status: "Published"
  create_article! title: "Writing an article draft", category_id: 3, status: "Draft"
  create_article! title: "Redirections", category_id: 4, status: "Published"
  create_article! title: "Redirections draft", category_id: 4, status: "Draft"
  Redirection.create!( from: "/welcome", to: "/public")
end

def create_organization!(options = {})
  org_attributes = { is_password_enabled: "false", password: "Welcome1" }
  attributes = org_attributes.merge options
  Organization.create! attributes
end

def create_user!(options = {})
  User.create! options
end

def create_category!(options = {})
  Category.create! options
end

def create_article!(options = {})
  article_attributes = { organization: Organization.first, user: User.first,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
    nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum."
  }
  attributes = article_attributes.merge options
  Article.create! attributes
end