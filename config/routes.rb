Rails.application.routes.draw do
  devise_for :users
  root to: 'meseeages#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, onry: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end