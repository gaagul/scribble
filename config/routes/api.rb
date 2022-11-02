# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
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
end
