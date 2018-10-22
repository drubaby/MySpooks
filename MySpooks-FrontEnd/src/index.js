document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded')

  let monsterForm = document.querySelector(".add-monster-form")
  monsterForm.addEventListener('submit', createMonster)

  getSpooksFetch()
  getMonstersFetch()
})


function getSpooksFetch() {
  fetch('http://localhost:3000/spooks/')
  .then(response => response.json())
  .then(data => {
    data.forEach(spook => makeMenu(spook))
  })
}

function makeMenu(spook) {
  let fearsMenu = document.querySelector(".monster-fears")

  let option = document.createElement("option")
  option.setAttribute("value", spook.name)
  option.innerText = spook.name
  fearsMenu.appendChild(option)
}


function getMonstersFetch() {
  fetch('http://localhost:3000/monsters')
  .then(response => response.json())
  .then(data => {
    data.forEach(monster => render(monster))
  })
}

function render(monster) {
  let container = document.querySelector(".monster-container")

  let div = document.createElement("div")
  div.className = "card"
  div.id = monster.id
  container.appendChild(div)

  let h3 = document.createElement("h3")
  h3.innerText = monster.name
  div.appendChild(h3)

  let img = document.createElement("img")
  img.setAttribute("src", monster.img_url)
  div.appendChild(img)

  let h5 = document.createElement("h5")
  h5.innerText = monster.spook.name
  div.appendChild(h5)

}
