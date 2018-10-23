let addMonster = false

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded')

  getSpooksFetch()
  getMonstersFetch()

  let monsterFormContainer = document.querySelector(".monster-form-container")
  monsterFormContainer.setAttribute("style", "display: none;")

  let newMonsterBtn = document.querySelector("#new-monster-btn")
  newMonsterBtn.addEventListener('click', getMonsterForm)
})

function getMonsterForm(event) {
  console.log("inside get monster form")
  addMonster = !addMonster
  let monsterFormContainer = document.querySelector(".monster-form-container")
  if (addMonster) {
    monsterFormContainer.style.display = 'block'
    let addMonsterForm = document.querySelector(".add-monster-form")
    addMonsterForm.addEventListener('submit', createSpook)
  } else {
    monsterFormContainer.style.display = 'none'
  }
}

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
    // render(monster)
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

  let fearsRange = select.options.length
  let randomFear = Math.floor(Math.random()*(fearsRange - 0) + 0)

  if (monsterFear[0] === randomFear) {
    let randomFear = Math.floor(Math.random()*(fearsRange - 0) + 0)
  } else {
    monsterFear.push(randomFear)
  }

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
    .then(monsterFear => {
      let id = monsterFear.monster_id
        fetch(`http://localhost:3000/monsters/${id}`)
          .then(res => res.json())
          .then(monster => {
            render(monster)
            console.log(monster)
          })
        })
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
  div.className = "monster-card"
  div.id = `monster-${monster.id}`
  container.appendChild(div)

//monster name
  let h3 = document.createElement("h3")
  h3.innerText = monster.name
  div.appendChild(h3)

//number of scares button
  let counterDiv = document.createElement("div")
  div.appendChild(counterDiv)

  let numberOfScaresSpan = document.createElement("span")
  numberOfScaresSpan.className = "scares-span"
  let timesFrightenedSpan = document.createElement("span")
  timesFrightenedSpan.className = "fears-span"
  counterDiv.appendChild(numberOfScaresSpan)
  counterDiv.appendChild(timesFrightenedSpan)

  let numberOfScares = document.createElement("button")
  numberOfScares.innerText = "0"
  numberOfScares.id = monster.id
  numberOfScares.className = "number-of-scares"
  numberOfScaresSpan.appendChild(numberOfScares)

  let p = document.createElement("p")
  p.innerText = "Number of Scares"
  numberOfScaresSpan.appendChild(p)

//times frightened button
  let timesFrightened = document.createElement("button")
  timesFrightened.innerText = "0"
  timesFrightened.id = monster.id
  timesFrightened.className = "times-frightened"
  timesFrightenedSpan.appendChild(timesFrightened)

  let p2 = document.createElement("p")
  p2.innerText = "Times Frightened"
  timesFrightenedSpan.appendChild(p2)



//hidden fears in span tags
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

//image
  let img = document.createElement("img")
  img.setAttribute("src", monster.img_url)
  img.className = "monster-img"
  div.appendChild(img)

//monster spookability
  let h5 = document.createElement("h5")
  h5.innerText = monster.spook.name
  h5.id = monster.spook.id
  div.appendChild(h5)

//spook the room button
  let buttonDiv = document.createElement("div")
  div.appendChild(buttonDiv)
  let spookBtn = document.createElement("button")
  spookBtn.innerText = "Spook the Room"
  spookBtn.id = monster.spook.id
  spookBtn.addEventListener("click", spookBtnHandler)
  buttonDiv.appendChild(spookBtn)

//banish a monster button
  let deleteBtn = document.createElement("button")
  deleteBtn.id = monster.id
  deleteBtn.dataset.spookId = monster.spook.id
  deleteBtn.innerText = "Banish Monster"
  deleteBtn.addEventListener("click", deleteBtnHandler)
  buttonDiv.appendChild(deleteBtn)
}

function deleteBtnHandler(e) {
  let monsterId = e.currentTarget.id
  let spookId = e.currentTarget.dataset.spookId
  //remove monster from db and DOM
  fetch(`http://localhost:3000/monsters/${monsterId}`, {
    method: "DELETE"
  }).then(res => {
    document.getElementById(`monster-${monsterId}`).remove()
  })
  //remove spook from db
  // BUG: breaks conditional rendering for monsters that fear this spook
  // fetch(`http://localhost:3000/spooks/${spookId}`, {
  //   method: "DELETE"
  // }).then(res => console.log(res))
}

function spookBtnHandler(e) {
  playScarySound()
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
        unspookedCard.className = "monster-card"
      }
    })
}

  function playScarySound() {
    var sound = new Audio("/Users/drubles/Development/code/mod3/MySpooks/MySpooks-FrontEnd/src/scream.wav")
    sound.play()
  }

function toggleSpooked(span) {
  let spookedCard = span.parentElement.parentElement
  spookedCard.className = "spooked-card"
  let frightCount = spookedCard.querySelector(".times-frightened")
  frightCount.innerText = parseInt(frightCount.innerText) + 1
}
