# frozen_string_literal: true

Organization.destroy_all
Article.destroy_all
Category.delete_all
User.destroy_all
Organization.create(title: "Spinkart", is_password_enabled: "false", password: "Welcome1")
Organization.first.users.create(name: "Oliver Smith")
7.times do
  Category.create!(title: Faker::Sports, organization: Organization.first)
end
40.times do
  Article.create!(
    title: Faker::Hacker.say_something_smart[0..10],
    category: Category.all.sample,
    user: User.first,
    body: Faker::TvShows::FamilyGuy.quote,
    status: ["published", "draft"].sample
  )
end
