class MonsterFear < ApplicationRecord
  belongs_to :monster
  belongs_to :spook
  # belongs_to :fear, class_name => "Spook"
end
