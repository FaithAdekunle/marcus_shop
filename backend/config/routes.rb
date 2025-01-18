Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api, path: "", defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        sessions: "overrides/sessions",
        registrations: "overrides/registrations"
      }

      resources :products, only: %i[index show]

      resources :users, only: %i[] do
        collection do
          get :current_user
        end
      end

      resources :cart_items, only: %i[index create update destroy]

      namespace :admin do
        resources :products, param: :product_id, only: %i[create update destroy] do
          member do
            resources :parts, param: :part_id, only: %i[create update destroy] do
              member do
                resources :options, param: :option_id, only: %i[create update destroy] do
                  member do
                    resources :mutual_exclusions, only: %i[create destroy]
                    resources :price_adjustments, only: %i[create update destroy]
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
