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

// Toggle form appearance on DOM
function getMonsterForm(event) {
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

// Fetch all spook objects to make menu on form
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

  option.setAttribute("id", spook.id)
  option.innerText = spook.name
  fearsMenu.appendChild(option)
}

function createSpook(event){
  event.preventDefault()
  let form = document.querySelector(".add-monster-form")
  let select = form.querySelector('.monster-fears')


///////////////////////////////////////////////////////
//
//   Functions invoked by form submit
//
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
// third: POST new monsterFear and assign random MonsterFear
function postMonsterFear(monster) {
  let form = document.querySelector(".add-monster-form")
  let select = form.querySelector('.monster-fears')
  let monsterFear = []

  let selectedFears = Array.from(select.options).filter(option => option.selected)
  selectedFears.forEach(fear => monsterFear.push(parseInt(fear.id)))

  //assigns random fear to new monster from existing MonsterFears
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
          console.log(monster) //debugging: verify that 2 fears added
        })
    })
  })
}
// end of form submit functions
/////////////////////////////////////////////////

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

  // Monster name
  let h3 = document.createElement("h3")
  h3.innerText = monster.name
  div.appendChild(h3)

  // # of scares and times frightened displayed on buttons in counterDiv
  let counterDiv = document.createElement("div")
  div.appendChild(counterDiv)

  // Two spans in counterDiv hold button and labels
  let numberOfScaresSpan = document.createElement("span")
  numberOfScaresSpan.className = "scares-span"
  let timesFrightenedSpan = document.createElement("span")
  timesFrightenedSpan.className = "fears-span"
  counterDiv.appendChild(numberOfScaresSpan)
  counterDiv.appendChild(timesFrightenedSpan)

  // # of scares button displays score
  let numberOfScaresBtn = document.createElement("button")
  numberOfScaresBtn.innerText = "0"
  numberOfScaresBtn.id = monster.id
  numberOfScaresBtn.className = "number-of-scares"
  numberOfScaresSpan.appendChild(numberOfScaresBtn)
  // # of scares button label
  let p = document.createElement("p")
  p.innerText = "Number of Scares"
  numberOfScaresSpan.appendChild(p)

  // Times frightened button displays frights
  let timesFrightened = document.createElement("button")
  timesFrightened.innerText = "0"
  timesFrightened.id = monster.id
  timesFrightened.className = "times-frightened"
  timesFrightenedSpan.appendChild(timesFrightened)
  // Times frightened button label
  let p2 = document.createElement("p")
  p2.innerText = "Times Frightened"
  timesFrightenedSpan.appendChild(p2)

  // "Hidden fears" holds MonsterFears in div
  let hiddenFearDiv = document.createElement("div")
  hiddenFearDiv.className = "hidden_fears"
  div.appendChild(hiddenFearDiv)
  // loop through monster.spooks and add spans to hidden div
  monster.spooks.forEach(fear => {
    let fearSpan = document.createElement('span')
    fearSpan.id = fear.id
    hiddenFearDiv.appendChild(fearSpan)
  })

  // Image
  let img = document.createElement("img")
  img.setAttribute("src", monster.img_url)
  img.className = "monster-img"
  div.appendChild(img)

  // Monster spook-ability
  let h5 = document.createElement("h5")
  h5.innerText = monster.spook.name
  h5.id = monster.spook.id
  div.appendChild(h5)

  // Spook the room button
  let buttonDiv = document.createElement("div")
  div.appendChild(buttonDiv)
  let spookBtn = document.createElement("button")
  spookBtn.innerText = "Spook the Room"
  spookBtn.id = monster.spook.id
  spookBtn.addEventListener("click", spookBtnHandler)
  buttonDiv.appendChild(spookBtn)

 // Banish (delete) a monster button
  let deleteBtn = document.createElement("button")
  deleteBtn.id = monster.id
  deleteBtn.dataset.spookId = monster.spook.id
  deleteBtn.innerText = "Banish Monster"
  deleteBtn.addEventListener("click", deleteBtnHandler)
  buttonDiv.appendChild(deleteBtn)
}

// Called by Banish Monster button
function deleteBtnHandler(e) {
  let monsterId = e.currentTarget.id
  let spookId = e.currentTarget.dataset.spookId
  // remove monster from db and DOM
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

// Called by "Spook the Room" button
function spookBtnHandler(e) {
  playScarySound()
  spookId = e.currentTarget.id
  let spookerCard = e.currentTarget.parentElement.parentElement
  let scareCount = spookerCard.querySelector(".number-of-scares")
  // Finds all hidden fears matching spooker's ability
  document.querySelectorAll('span').forEach(span => {
   if (span.id === spookId){
      // Increment spook count and call toggleSpooked on target
      scareCount.innerText = parseInt(scareCount.innerText) + 1
      toggleSpooked(span)
    }
    else {
      // Reset all other cards to unspooked
      let unspookedCard = span.parentElement.parentElement
      unspookedCard.className = "monster-card"
    }
  })
}
// Called by spookBtnHandler
function toggleSpooked(span) {
  let spookedCard = span.parentElement.parentElement
  spookedCard.className = "spooked-card"
  let frightCount = spookedCard.querySelector(".times-frightened")
  frightCount.innerText = parseInt(frightCount.innerText) + 1
}
/////////////
//TODO: give user ability to disable sound, maybe in navbar?
//////////
function playScarySound() {
  var sound = new Audio("/Users/drubles/Development/code/mod3/MySpooks/MySpooks-FrontEnd/src/scream.wav")
  sound.play()
}
