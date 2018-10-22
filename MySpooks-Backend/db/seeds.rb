# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


blood = Spook.create(name: "Blood Drinking")
water = Spook.create(name: "Holy Water")
spiders = Spook.create(name: "Spidey Senses")

dracula = Monster.create(name: "Dracula", img_url: "https://i5.walmartimages.com/asr/9f20b6c2-5dba-40f0-9c5c-86a5f680ec12_1.6e726ae79f76c679a13442c50596799b.jpeg?odnBg=ffffff", spook_id: 1)
nun = Monster.create(name: "Scary nun", img_url: "https://i.ebayimg.com/images/g/SFMAAOSwzF1Z0tSl/s-l300.jpg", spook_id: 2)
spider = Monster.create(name: "Giant Spider", img_url: "https://coddeschimbare.files.wordpress.com/2014/09/10633440_706820582719643_3851334158261552976_o.jpg", spook_id: 3)

MonsterFear.create(monster_id: 1, spook_id: 2)
MonsterFear.create(monster_id: 2, spook_id: 3)
MonsterFear.create(monster_id: 3, spook_id: 1)
