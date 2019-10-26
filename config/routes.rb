Rails.application.routes.draw do
  devise_for :users
  root to: 'meseeages#index'
  resources :users, only: [:edit, :update]
end
