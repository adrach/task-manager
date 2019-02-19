Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :post, only: [:index, :create, :show, :update, :destroy]
  end
  root 'project#index'
end
