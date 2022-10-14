# frozen_string_literal: true

Rails.application.routes.draw do
  get "organizations/index"
  get "organizations/update"
  constraints(lambda { |req| req.format == :json }) do
      resources :categories, except: %i[new edit]
      resources :articles, except: %i[new edit], param: :slug
    end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
