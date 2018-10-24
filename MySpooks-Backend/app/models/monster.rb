class Monster < ApplicationRecord
  belongs_to :spook
  has_many :monster_fears
  has_many :spooks, through: :monster_fears

  validates :name, presence: true
end
