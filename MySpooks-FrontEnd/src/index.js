let addMonster = false

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded')

  getSpooksFetch()
  getMonstersFetch()

  let monsterSubmitBtn = document.querySelector(".add-monster-form")
  monsterSubmitBtn.addEventListener('submit', createEntireMonster)

  let mostScaresBtn = document.querySelector("#mostScaresButton")
  mostScaresBtn.addEventListener('click', mostScaresButtonhandler)

  let mostFrightsBtn = document.querySelector("#mostFrightsButton")
  mostFrightsBtn.addEventListener('click', mostFrightsButtonHandler)

})

// Fetch all spook objects to make menu on form
function getSpooksFetch() {
  fetch('http://localhost:3000/spooks/')
  .then(response => response.json())
  .then(data => {
    data.forEach(spook => {
      // makeScareOptions(spook)
      makeFearsOptions(spook)}
    )
  })
}

function getMonstersFetch() {
  fetch('http://localhost:3000/monsters')
  .then(response => response.json())
  .then(data => {
    data.forEach(monster => render(monster))
  })
}


function makeScareOptions(spook) {
  let scaresMenu = document.querySelector("#monster-scares")
  let option = document.createElement("option")
  option.setAttribute("id", spook.id)
  option.innerText = spook.name
  scaresMenu.appendChild(option)
}

function makeFearsOptions(spook) {
    let fearsMenu = document.querySelector("#monster-fears")
    let option = document.createElement("option")
    option.setAttribute("id", spook.id)
    option.innerText = spook.name
    fearsMenu.appendChild(option)
}

// Experimenting with JS form validation

function validateForm(){
  let form = document.querySelector(".add-monster-form")
  let nameValue = form.name.value;
  let newSpookName = form.spook.value
  if (nameValue == "") {
    alert("Name must be filled out");
    console.log("no name")
    return false;
  }
  else if (newSpookName == "") {
    alert("New monsters must have a spook ability!");
    console.log("no spook was entered")
    return false;
  }
  console.log("Finished validating")
  return true
}

function createEntireMonster(e) {
  e.preventDefault()
  if (!validateForm()) {
    return
  }
  let monsterName = e.currentTarget.name.value
  let monsterImg = e.currentTarget.img_url.value
  let monsterSpook = e.currentTarget.spook.value

  if (monsterImg == ""){
    monsterImg = 'src/profile.jpg'
  }

  let select = e.currentTarget.querySelector('#monster-fears')
  let monsterFear = []


  let selectedFears = Array.from(select.options).filter(option => option.selected)
  selectedFears.forEach(fear => monsterFear.push(parseInt(fear.id)))

  let chosenFear = monsterFear[0]

  // debugger
  fetch(`http://localhost:3000/create_entire_monster`,
  { method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: monsterName,
      img_url: monsterImg,
      spook: monsterSpook,
      fear: chosenFear
    })
  }).then(res => res.json())
  .then(monstObj => render(monstObj))

  $('#exampleModal').modal('toggle')
  let form = document.querySelector(".add-monster-form")
  form.reset()
}


  //render monster card
function render(monster) {
  // debugger

  let container = document.querySelector(".monster-container")

  // Monster Card Div
  let monsterCardDiv = document.createElement("div")
  monsterCardDiv.className = "monster-card"
  monsterCardDiv.id = `monster-${monster.id}`
  container.appendChild(monsterCardDiv)

  // Monster name
  let h3 = document.createElement("h3")
  h3.innerText = monster.name
  monsterCardDiv.appendChild(h3)

  //Wrapper div for BACK
  let backDiv = document.createElement("div")
  backDiv.className = "back-card"
  backDiv.hidden = true
  monsterCardDiv.appendChild(backDiv)

  let fearsListDiv = document.createElement("div")
  fearsListDiv.innerText = `Fears: ${monster.spooks[0].name} and ${monster.spooks[1].name}.`
  backDiv.appendChild(fearsListDiv)

  // Wrapper div for Front
  let flippableDiv = document.createElement("div")
  flippableDiv.className = "front-card"
  monsterCardDiv.appendChild(flippableDiv)

  // Front
  // # of scares and times frightened displayed on buttons in counterDiv
  let counterDiv = document.createElement("div")
  flippableDiv.appendChild(counterDiv)

  // Front
  // Two spans in counterDiv hold button and labels
  let numberOfScaresSpan = document.createElement("span")
  numberOfScaresSpan.className = "scares-span"
  let timesFrightenedSpan = document.createElement("span")
  timesFrightenedSpan.className = "fears-span"
  counterDiv.appendChild(numberOfScaresSpan)
  counterDiv.appendChild(timesFrightenedSpan)

  // Front
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

  // Front
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

  // Front???
  // "Hidden fears" holds MonsterFears in div
  let hiddenFearDiv = document.createElement("div")
  hiddenFearDiv.className = "hidden_fears"
  flippableDiv.appendChild(hiddenFearDiv)
  // loop through monster.spooks and add spans to hidden div
  monster.spooks.forEach(fear => {
    let fearSpan = document.createElement('span')
    fearSpan.id = fear.id
    fearSpan.className = fear.name
    hiddenFearDiv.appendChild(fearSpan)
  })

  // Front
  // Image
  let img = document.createElement("img")
  img.setAttribute("src", monster.img_url)
  img.className = "monster-img"
  flippableDiv.appendChild(img)

  // Front
  // Monster spook-ability
  let h6 = document.createElement("h6")
  h6.innerText = monster.spook.name
  h6.id = monster.spook.id
  flippableDiv.appendChild(h6)

  // Front
  // Spook the room button
  let buttonDiv = document.createElement("div")
  buttonDiv.id = "spook-banish-btns"
  flippableDiv.appendChild(buttonDiv)
  let spookBtn = document.createElement("button")
  spookBtn.innerText = "Spook the Room"
  spookBtn.id = monster.spook.id
  spookBtn.addEventListener("click", spookBtnHandler)
  buttonDiv.appendChild(spookBtn)

  // Front
 // Banish (delete) a monster button
  let deleteBtn = document.createElement("button")
  deleteBtn.id = monster.id
  deleteBtn.dataset.spookId = monster.spook.id
  deleteBtn.innerText = "Banish Monster"
  deleteBtn.addEventListener("click", deleteBtnHandler)
  buttonDiv.appendChild(deleteBtn)

  // Both Front and Back
  //flip card button
  let flipBtnDiv = document.createElement("div")
  flipBtnDiv.id = "flip-btn-div"
  let flipBtn = document.createElement("button")
  flipBtn.id = monster.id
  flipBtn.innerText = "Flip"
  flipBtn.className = "btn btn-warning"
  flipBtn.addEventListener('click', flipBtnHandler)
  flipBtnDiv.appendChild(flipBtn)
  monsterCardDiv.appendChild(flipBtnDiv)
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
}

  // Called by Flip button on card
function flipBtnHandler(e) {
  let monsterCard = e.currentTarget.parentElement.parentElement
  let frontCardDiv = monsterCard.querySelector(".front-card")
  let backCardDiv = monsterCard.querySelector(".back-card")

  if (monsterCard.className === "monster-card") {
    monsterCard.className = "flipped-card"
    frontCardDiv.setAttribute("hidden", "")
    backCardDiv.removeAttribute("hidden")
  }
  else if (monsterCard.className === "monster-card spooked-card") {
    monsterCard.className = "flipped-card spooked-card"
    frontCardDiv.setAttribute("hidden", "")
    backCardDiv.removeAttribute("hidden")
  }
  else if (monsterCard.className === "flipped-card spooked-card") {
    monsterCard.className = "monster-card spooked-card"
    frontCardDiv.removeAttribute("hidden")
    backCardDiv.setAttribute("hidden", "")
  }
  else {
    monsterCard.className = "monster-card"
    frontCardDiv.removeAttribute("hidden")
    backCardDiv.setAttribute("hidden", "")
  }
}

// Called by "Spook the Room" button
function spookBtnHandler(e) {
  playScarySound()
  // set monster-card class name to 'monster-card' to reset previous spooks
  document.querySelectorAll('.spooked-card').forEach(card => {

      if (card.className === "monster-card spooked-card"){
      card.className = "monster-card"
      // console.log(`${card.id} reset to monster-card`)
      card.querySelector('.front-card').removeAttribute("hidden")
      card.querySelector('.back-card').setAttribute("hidden", "")
    } else if (card.className === "flipped-card spooked-card") {
      card.className = "flipped-card"
      // console.log(`${card.id} reset to flipped-card`)
    }
  })
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
  })
}
// Called by spookBtnHandler
function toggleSpooked(span) {
  // debugger
  let spookedCard = span.parentElement.parentElement.parentElement
  spookedCard.classList.add("spooked-card")
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

// rank by most scares
function findMostScares(){
  let mostScaresArray = []
  scareBtns = document.querySelectorAll('.number-of-scares')
  scareBtns.forEach( button => {
    let monsterHash = {}
    monsterHash["monsterId"] = button.id
    monsterHash["scareCount"] = button.innerText
    mostScaresHash.push(monsterHash)
  })
  mostScaresHash.sort(function (a, b) {
  return b.scareCount - a.scareCount;
  });

}

function mostScaresButtonhandler(){
  //call find most scares
  let mostScaresArray = []
  let scareBtns = document.querySelectorAll('.number-of-scares')
  scareBtns.forEach( button => {
    let monsterHash = {}
    monsterHash["monsterName"] = button.parentElement.parentElement.parentElement.parentElement.querySelector('h3').innerText
    monsterHash["scareCount"] = button.innerText
    mostScaresArray.push(monsterHash)
  })
  mostScaresArray.sort(function (a, b) {
  return b.scareCount - a.scareCount;
  });
  //populate button dropdown with ranked monsters
  let mostScaresDropdown = document.querySelector("#most-scares-parent-div")
  mostScaresDropdown.innerHTML = ""
  let scareScore = 1
  for (hash of mostScaresArray){
    let a = document.createElement('a')
    a.className = "dropdown-item"
    mostScaresDropdown.appendChild(a)
    a.innerText = `${scareScore}. ${hash["monsterName"]} - ${hash["scareCount"]} scares`
    scareScore += 1
    // console.log(hash)
  }
}

function mostFrightsButtonHandler(){
  let mostFrightsArray = []
  let frightBtns = document.querySelectorAll('.times-frightened')
  frightBtns.forEach( button => {
    let monsterHash = {}
    monsterHash["monsterName"] = button.parentElement.parentElement.parentElement.parentElement.querySelector('h3').innerText
    monsterHash["frightCount"] = button.innerText
    mostFrightsArray.push(monsterHash)

  })

  mostFrightsArray.sort(function (a, b) {
  return b.frightCount - a.frightCount;
  });
  //populate button dropdown with ranked monsters
  let mostFrightsDropdown = document.querySelector("#most-frights-parent-div")
  mostFrightsDropdown.innerHTML = ""
  let scareScore = 1
  for (hash of mostFrightsArray){
    let a = document.createElement('a')
    a.className = "dropdown-item"
    mostFrightsDropdown.appendChild(a)
    a.innerText = `${hash["monsterName"]} - ${hash["frightCount"]} frights`
    scareScore += 1
  }
}

function findScareFrightHash() {
  let monsterRatios = []
  monsterCards.forEach(card => {
    let ratioHash = {}
    let name = card.querySelector('h3').innerText
    let scareCount = card.querySelector('.number-of-scares').innerText
    let frightCount = card.querySelector('.times-frightened').innerText
    ratioHash["name"] = card.querySelector('h3').innerText
    ratioHash["scare_count"] = parseInt(scareCount)
    ratioHash["fright_count"] = parseInt(frightCount)
    monsterRatios.push(ratioHash)
  })
  return monsterRatios
  // name: "Giant Spider", scare_count: 15, fright_count: 7}

  //rank each monster by scares per frights
  // for each monster divide scares by frights
  //if frights == 0 [aka infinity] order those first
  //if scares == 0 it will return NaN order those last (least scary)

}
