Rails.application.routes.draw do
  devise_for :users
  root to: 'meseeages#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, onry: [:new, :create, :edit, :update]
end
