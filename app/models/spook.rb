class Spook < ApplicationRecord
  has_many :monsters
  has_many :monster_fears
  has_many :monsters, through: :monster_fears
end
