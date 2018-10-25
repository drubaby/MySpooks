let addMonster = false

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded')

  getSpooksFetch()
  getMonstersFetch()

  let monsterSubmitBtn = document.querySelector(".add-monster-form")
  monsterSubmitBtn.addEventListener('submit', createEntireMonster)

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

  //flip card button
  let flipBtn = document.createElement("button")
  flipBtn.id = monster.id
  flipBtn.innerText = "Flip"
  flipBtn.addEventListener('click', flipBtnHandler)
  buttonDiv.appendChild(flipBtn)
}

function flipBtnHandler(e) {
  let monsterId = e.currentTarget.id
  let monsterCard = document.querySelector(`#monster-${monsterId}`)
  monsterCard.classList.add("flipped-card")
    debugger
  
//flip function
//get target id of that card
// make card empty
//refill card with what we want
//make class .flipped-card to style
  //background Image
  //etc
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

// Called by "Spook the Room" button
function spookBtnHandler(e) {
  playScarySound()
  document.querySelectorAll('span').forEach(span => {
    span.parentElement.parentElement.className = 'monster-card'
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
    // else {
    //   // Reset all other cards to unspooked
    //   let unspookedCard = span.parentElement.parentElement
    //   unspookedCard.className = "monster-card"
    // }
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
