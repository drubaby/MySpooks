Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :monsters
  resources :spooks, except: [:update]
  resources :monster_fears, except: [:update]
  post "/create_entire_monster", to: "monsters#create_entire_monster"
end
