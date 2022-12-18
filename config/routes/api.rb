# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    resources :categories, except: %i[new edit]
    resources :articles, except: %i[new edit] do
      resources :versions, only: :index, controller: :article_versions
      resources :schedules, only: %i[index create destroy]
      collection do
        resource :report, only: %i[create], module: :articles do
          get :download, on: :collection
        end
        get :analytics
        get :table_list
        post :bulk_update
      end
    end
    resources :organizations, only: %i[index update]
    resources :redirections, except: %i[new edit]
    resource :session, only: :create
    namespace :eui do
      resources :articles, only: %i[index show], param: :slug
      resources :categories, only: %i[index]
    end
  end
end
