# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Spook.create(name: "Blood Drinking") #1
Spook.create(name: "Holy Water") #2
Spook.create(name: "Spidey Senses") #3
Spook.create(name: "Unearthly moaning") #4
Spook.create(name: "The bone dance") #5
Spook.create(name: "Chasing with knife raised") #6
Spook.create(name: "Hiding under the bed") #7
Spook.create(name: "Demonic powers") #8
Spook.create(name: "Popping out of surprising places") #9



Monster.create(name: "Dracula", img_url: "https://i5.walmartimages.com/asr/9f20b6c2-5dba-40f0-9c5c-86a5f680ec12_1.6e726ae79f76c679a13442c50596799b.jpeg?odnBg=ffffff", spook_id: 1)
MonsterFear.create(monster_id: 1, spook_id: 2)

Monster.create(name: "Scary nun", img_url: "https://i.ebayimg.com/images/g/SFMAAOSwzF1Z0tSl/s-l300.jpg", spook_id: 2)
MonsterFear.create(monster_id: 2, spook_id: 3)

Monster.create(name: "Giant Spider", img_url: "https://coddeschimbare.files.wordpress.com/2014/09/10633440_706820582719643_3851334158261552976_o.jpg", spook_id: 3)
MonsterFear.create(monster_id: 3, spook_id: 1)

Monster.create(name: "Unsettling Clown", img_url: "http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/4c/hz/p04chzvm.jpg", spook_id: 7)
MonsterFear.create(monster_id: 4, spook_id: 8)

Monster.create(name: "The Bride", img_url: "http://photos.costume-works.com/full/corpse_bride5.jpg", spook_id: 6)
MonsterFear.create(monster_id: 5, spook_id:5)

Monster.create(name: "Gremlin", img_url: "https://assets.catawiki.nl/assets/2017/12/13/0/3/1/0315257f-cfcf-4a8a-a59b-acdd6727b84d.jpg", spook_id: 6)
MonsterFear.create(monster_id: 6, spook_id: 1)

Monster.create(name: "Snuggles", img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSmRe1x-TPVjRbtEARsxDGDjJ9EykK1dW-GrPViuaIQXaCw1WeBA", spook_id: 9)
MonsterFear.create(monster_id: 7, spook_id: 2)

Monster.create(name: "Skellington", img_url: "https://i1.sndcdn.com/artworks-000190178047-l26yen-t500x500.jpg", spook_id: 5)
MonsterFear.create(monster_id: 8, spook_id: 2)

Monster.create(name: "David Pumpkins", img_url: "https://media.tenor.com/images/303963bcad65e27493c919c1c5b89472/tenor.png", spook_id:9)
MonsterFear.create(monster_id:9, spook_id: 1)

Monster.create(name: "Slithery Snake", img_url: "https://horrorfreaknews.com/wp-content/uploads/2017/03/442dd460c489fe8eb1dac765f98d51f8.jpg", spook_id: 9)
MonsterFear.create(monster_id:10, spook_id: 5)
