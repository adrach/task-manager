Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :post, only: [:index, :create, :show, :update, :destroy]
    resources :project, only: [:index, :create]
    resources :task, only: [:create, :update]
  end
  root 'project#index'
end
