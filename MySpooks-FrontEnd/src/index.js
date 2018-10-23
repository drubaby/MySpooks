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

// first: POST the new spook
  let newSpookName = form.spook.value
  fetch('http://localhost:3000/spooks/', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: newSpookName
    })
  }).then(res => res.json())
  .then(spookObj => {
    createMonster(spookObj)
  })
}

// second: POST new monster with spook ID
function createMonster(spookObj) {
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
    //post new monsterFear
    postMonsterFear(monster)
    // then render monster card
    render(monster)
  })
  }

// third: POST new monsterFear
function postMonsterFear(monster) {
  let form = document.querySelector(".add-monster-form")
  let select = form.querySelector('.monster-fears')
  let monsterFear = []

  let selectedFears = Array.from(select.options).filter(option => option.selected)
  selectedFears.forEach(fear => monsterFear.push(parseInt(fear.id)))
  let monsterId = monster.id

  monsterFear.forEach(fear => {
    let data = {
      monster_id: monsterId,
      spook_id: fear
    }
    fetch("http://localhost:3000/monster_fears", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(monsterFear => console.log(monsterFear))
    }
  )
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
  div.id = `monster-${monster.id}`
  // div.dataset.monsterCardId = monster.id
  container.appendChild(div)

  let h3 = document.createElement("h3")
  h3.innerText = monster.name
  div.appendChild(h3)

  let counterDiv = document.createElement("div")
  let numberOfScares = document.createElement("button")
  numberOfScares.innerText = "0"
  numberOfScares.id = monster.id
  numberOfScares.className = "number-of-scares"
  counterDiv.appendChild(numberOfScares)

  let timesFrightened = document.createElement("button")
  timesFrightened.innerText = "0"
  timesFrightened.id = monster.id
  timesFrightened.className = "times-frightened"
  counterDiv.appendChild(timesFrightened)

  div.appendChild(counterDiv)

  let hiddenFearDiv = document.createElement("div")
  hiddenFearDiv.className = "hidden_fears"
  div.appendChild(hiddenFearDiv)
  // loop through monster.spooks and add spans to hidden div
  monster.spooks.forEach(fear => {
    // debugger
    let fearSpan = document.createElement('span')
    fearSpan.id = fear.id
    hiddenFearDiv.appendChild(fearSpan)
  })


  let img = document.createElement("img")
  img.setAttribute("src", monster.img_url)
  img.className = "monster-img"
  div.appendChild(img)

  let h5 = document.createElement("h5")
  h5.innerText = monster.spook.name
  h5.id = monster.spook.id
  div.appendChild(h5)

  let buttonDiv = document.createElement("div")
  div.appendChild(buttonDiv)
  let spookBtn = document.createElement("button")
  spookBtn.innerText = "Spook the Room"
  spookBtn.id = monster.spook.id
  spookBtn.addEventListener("click", spookBtnHandler)
  buttonDiv.appendChild(spookBtn)
  // get monster spook ability ID
  // go through all monster's fears on page
  //    light up scared monster cards
  //    increment this monster's scare score counter
  //    increment scared monsters frightened score counters

  let deleteBtn = document.createElement("button")
  deleteBtn.id = monster.id
  deleteBtn.innerText = "Banish Monster"
  deleteBtn.addEventListener("click", deleteBtnHandler)
  buttonDiv.appendChild(deleteBtn)
  // debugger
}

function deleteBtnHandler(e) {
  let monsterId = e.currentTarget.id
  let spookId = e.currentTarget.parentElement.querySelector(`h5`).id
  //remove monster from db and DOM
  fetch(`http://localhost:3000/monsters/${monsterId}`, {
    method: "DELETE"
  }).then(res => {
    document.getElementById(`monster-${monsterId}`).remove()
  })
  //remove spook from db
  fetch(`http://localhost:3000/spooks/${spookId}`, {
    method: "DELETE"
  }).then(res => console.log(res))
}

function spookBtnHandler(e) {
  spookId = e.currentTarget.id
  
  let spookerCard = e.currentTarget.parentElement.parentElement
  let scareCount = spookerCard.querySelector(".number-of-scares")
  // let scareText = scareCount.innerText
  // TODO: increment current target's scare count by number of spooks below
  document.querySelectorAll('span').forEach(span => {
	   if (span.id === spookId){
	      console.log("i am spooked")
        scareCount.innerText = parseInt(scareCount.innerText) + 1
        toggleSpooked(span)
      }
      else {
        let unspookedCard = span.parentElement.parentElement
        unspookedCard.className = "card"
      }
      // TODO: toggle all cards white before spooking new cards
    })

}

function toggleSpooked(span) {
  let spookedCard = span.parentElement.parentElement
  spookedCard.className = "spooked-card"
  let frightCount = spookedCard.querySelector(".times-frightened")
  frightCount.innerText = parseInt(frightCount.innerText) + 1
}
