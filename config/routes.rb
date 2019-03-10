Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :post, only: [:index, :create, :show, :update, :destroy]
    resources :project, only: [:index, :create, :update, :destroy]
    resources :task, only: [:create, :update, :destroy]
    resources :action, only: [:create, :update, :destroy]
    post 'task/update_order', to: 'task#update_order'
  end
  root 'project#index'
end
