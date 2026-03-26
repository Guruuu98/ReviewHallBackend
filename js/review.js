const games = {

gta5:{

title:"Grand Theft Auto V",

rating:"⭐ 9.5 / 10",

image:"../images/gta5.jpg",

video:"https://www.youtube.com/embed/QkkoHAzjnUs",

description:"GTA V is one of the best open world games ever created. It features a massive world, exciting missions, and multiplayer gameplay.",

platforms:[
"PC (Steam)",
"PlayStation",
"Xbox"
],

pros:[
"Huge open world",
"Amazing story",
"Great graphics",
"Fun gameplay"
],

cons:[
"Large download size",
"Requires powerful hardware"
]

},

valorant:{

title:"Valorant",

rating:"⭐ 9 / 10",

image:"../images/valorant.jpg",

video:"https://www.youtube.com/embed/e_E9W2vsRbQ",

description:"Valorant is a tactical FPS by Riot Games combining precise shooting with unique character abilities.",

platforms:[
"PC (Riot Client)"
],

pros:[
"Competitive gameplay",
"Strong esports scene",
"Unique abilities"
],

cons:[
"Toxic community sometimes",
"High learning curve"
]

},

pubg:{

title:"PUBG Mobile",

rating:"⭐ 8.5 / 10",

image:"../images/pubg.jpg",

video:"https://www.youtube.com/embed/uCd6tbUAy6o",

description:"PUBG Mobile is a battle royale game where players compete to survive on a large map.",

platforms:[
"Android",
"iOS",
"PC (PUBG Battlegrounds)"
],

pros:[
"Realistic gameplay",
"Large maps",
"Multiplayer fun"
],

cons:[
"Large updates",
"Occasional bugs"
]

}

}

const params = new URLSearchParams(window.location.search)

const gameKey = params.get("game")

const game = games[gameKey]

if(game){

document.getElementById("gameTitle").innerText = game.title
document.getElementById("gameRating").innerText = game.rating
document.getElementById("gameImage").src = game.image
document.getElementById("gameDescription").innerText = game.description
document.getElementById("gameVideo").src = game.video

const prosList = document.getElementById("gamePros")

game.pros.forEach(pro=>{

let li=document.createElement("li")
li.innerText=pro

prosList.appendChild(li)

})


const consList = document.getElementById("gameCons")

game.cons.forEach(con=>{

let li=document.createElement("li")
li.innerText=con

consList.appendChild(li)

})


const platformList = document.getElementById("gamePlatforms")

game.platforms.forEach(platform=>{

let li=document.createElement("li")
li.innerText=platform

platformList.appendChild(li)

})

}

// comment section

// get game id
const input = document.getElementById("commentInput")
const button = document.getElementById("postComment")
const list = document.getElementById("commentList")

// load comments
let comments = JSON.parse(localStorage.getItem(gameKey + "_comments")) || []

function displayComments(){

list.innerHTML = ""

comments.forEach((text, index)=>{

const div = document.createElement("div")
div.classList.add("comment")

div.innerHTML = `
<span>${text}</span>
<span class="delete-btn" data-id="${index}">❌</span>
`

list.appendChild(div)

})

}

// add comment
button.addEventListener("click", ()=>{

let text = input.value.trim()

if(text === "") return

comments.push(text)

localStorage.setItem(gameKey + "_comments", JSON.stringify(comments))

input.value = ""

displayComments()

})

// delete comment
list.addEventListener("click", (e)=>{

if(e.target.classList.contains("delete-btn")){

let id = e.target.dataset.id

comments.splice(id,1)

localStorage.setItem(gameKey + "_comments", JSON.stringify(comments))

displayComments()

}

})

// initial load
displayComments()
