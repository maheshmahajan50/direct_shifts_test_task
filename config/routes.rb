Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root 'home#index'

  # devise_for :users, controllers: {
  #   sessions: 'users/sessions',
  #   registrations: 'users/registrations'
  # }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '*path', to: 'home#index', via: :all
end
