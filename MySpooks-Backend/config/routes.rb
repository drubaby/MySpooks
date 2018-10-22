Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :monsters
  resources :spooks, except: [:update, :destroy]
  resources :monster_fears, except: [:update, :destroy]
end
