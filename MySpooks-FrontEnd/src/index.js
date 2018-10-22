document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded')

  getSpooksFetch()
  getMonstersFetch()

  let monsterForm = document.querySelector(".add-monster-form")
  monsterForm.addEventListener('submit', createSpook)
})


function getSpooksFetch() {
  fetch('http://localhost:3000/spooks/')
  .then(response => response.json())
  .then(data => {
    data.forEach(spook => makeMenu(spook))
  })
}

function createSpook(event){
  event.preventDefault()
  let form = document.querySelector(".add-monster-form")
  let select = form.querySelector('.monster-fears')
  //
  // let monsterName = form.name.value
  // let monsterImgURL = form.img_url.value
  // let monsterFear = []
  //
  // let selectedFears = Array.from(select.options).filter(option => option.selected)
  // selectedFears.forEach(fear => monsterFear.push(parseInt(fear.id)))
  //
  // console.log(monsterFear)
  // let monsterData = {
  //   name: monsterName,
  //   img_url: monsterImgURL
  // }
// first: POST the new spook
  let newSpookName = form.spook.value
  fetch('http://localhost:3000/spooks/', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: newSpookName
    })
  }).then(res => res.json())
  .then(spookObj => {console.log(spookObj)
    createMonster(spookObj)
  })
}

function createMonster(spookObj) {
  console.log("In create monster function")
  let spookId = spookObj.id
  let form = document.querySelector(".add-monster-form")

  let monsterName = form.name.value
  let monsterImgURL = form.img_url.value

  let data = {
    name: monsterName,
    img_url: monsterImgURL,
    spook_id: spookId
  }

  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(monster => {
    render(monster)
  })
  }




function makeMenu(spook) {
  let fearsMenu = document.querySelector(".monster-fears")

  let option = document.createElement("option")
  option.setAttribute("id", spook.id)
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
  img.className = "monster-img"
  div.appendChild(img)

  let h5 = document.createElement("h5")
  h5.innerText = monster.spook.name
  div.appendChild(h5)

}
