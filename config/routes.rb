Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  root "shadcn_showcase#index"
  get "/mui", to: "mui_showcase#index", as: :mui

  scope :shadcn, controller: :shadcn_showcase, as: :shadcn do
    get :button
    get :badge
    get :card
    get :alert
    get :input
    get :dialog
    get :dropdown_menu
    get :combobox
    get :native_select
  end

  scope :mui, controller: :mui_showcase, as: :mui do
    get :button
    get :input
    get :dropdown_menu
  end
end
