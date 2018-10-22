class MonsterSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url, :spook_id
  belongs_to :spook
  has_many :spooks, through: :monster_fears
end
