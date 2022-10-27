# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
      resources :categories, except: %i[new edit]
      resources :articles, except: %i[new edit]
      resources :organizations, only: %i[index update]
      resources :redirections, except: %i[new edit]
      resource :session, only: :create
      namespace :eui do
        resources :articles, only: %i[show], param: :slug
        resources :categories, only: %i[index]
      end
    end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
