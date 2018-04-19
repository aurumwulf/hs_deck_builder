Rails.application.routes.draw do
  namespace :api do
    resources :decks
    get 'query', to: 'query#query'
  end

  get '*other', to: 'static#index'
end
