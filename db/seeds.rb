# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


blood = Spook.create(name: "Blood Drinking")
water = Spook.create(name: "Holy Water")

dracula = Monster.create(name: "Dracula", img_url: "", spook_id: 1)

MonsterFear.create(monster_id: 1, spook_id: 2)
