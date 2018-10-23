class Spook < ApplicationRecord
  has_one :monster
  has_many :monster_fears
  has_many :monsters, through: :monster_fears

  validates :name, presence: true
end
