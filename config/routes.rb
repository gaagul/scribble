# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
      resources :categories, except: %i[new edit]
      resources :articles, except: %i[new edit], param: :slug
      resources :organizations, only: %i[index update]
    end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
