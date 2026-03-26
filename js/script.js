function goLogin(){
window.location.href = "login.html"
}

function goSignup(){
window.location.href = "signup.html"
}

// loading screen

window.addEventListener("load", ()=>{

const loader = document.getElementById("introLoader")

// faster on mobile
const isMobile = window.innerWidth < 768
const duration = isMobile ? 2000 : 2600

setTimeout(()=>{

const flash = document.createElement("div")
flash.className = "flash"
document.body.appendChild(flash)

flash.style.opacity = "1"

setTimeout(()=>{
flash.style.opacity = "0"
},120)

setTimeout(()=>{
loader.style.display = "none"
flash.remove()
},350)

},duration)

})
// hero particles

const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<80;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:2
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fillStyle="#ffffff"
ctx.fill()

p.y -= 0.3

if(p.y<0) p.y = canvas.height

})

requestAnimationFrame(draw)

}

draw()

// hamburger menu

const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click",()=>{

navMenu.classList.toggle("active")

})

// avatar

function toggleMenu(){
document.getElementById("dropdownMenu").classList.toggle("show")
}

document.addEventListener("DOMContentLoaded", ()=>{

const user = JSON.parse(localStorage.getItem("user"))

const authButtons = document.getElementById("authButtons")
const userSection = document.getElementById("userSection")
const avatar = document.getElementById("userAvatar")

console.log("USER:", user) // DEBUG

if(user){

authButtons.style.display = "none"
userSection.style.display = "flex"

avatar.src = `https://ui-avatars.com/api/?name=${user.username || user.email}&background=2c2c2c&color=ffffff&bold=true`

}

})

// logout

function logout(){

showToast("Logging out...")

document.body.classList.add("fade-out")

setTimeout(()=>{

localStorage.removeItem("user")

showToast("Logged out 👋")

setTimeout(()=>{
window.location.reload()
},800)

},500)

}


// profile button

function goProfile(){
window.location.href = "profile.html"
}


// saved games

document.querySelectorAll(".save-btn").forEach(btn=>{

btn.addEventListener("click", async ()=>{

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
showToast("Login first ⚠️")
return
}

const card = btn.closest(".game-card")

const game = card.querySelector("h3").innerText
const video = game.clip?.clip

card.innerHTML = `
<div class="media-slider">

<img src="${game.background_image}" class="poster">

${video ? `<video src="${video}" muted loop></video>` : ""}

</div>
...
`

await fetch("https://reviewhallbackend.onrender.com/api/favorites/add",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
userId: user._id,
game,
image
})
})

showToast("Saved ❤️")

})

})

const favButtons = document.querySelectorAll(".fav-btn")

// load saved favorites
let saved = JSON.parse(localStorage.getItem("favorites")) || []

favButtons.forEach((btn, index) => {

if(saved.includes(index)){
btn.classList.add("active")
btn.innerText = "❤️"
}

btn.addEventListener("click", () => {

btn.classList.toggle("active")

if(btn.classList.contains("active")){

btn.innerText = "❤️"
saved.push(index)

}else{

btn.innerText = "♡"
saved = saved.filter(i => i !== index)

}

localStorage.setItem("favorites", JSON.stringify(saved))

})

})


// trending section scroll

const trending = document.getElementById("trendingSlider")

setInterval(()=>{
trending.scrollBy({left:250, behavior:"smooth"})
},3000)



//scroll animation

window.addEventListener("scroll",()=>{

let header = document.querySelector("header")

if(window.scrollY > 50){

header.classList.add("scrolled")

}else{

header.classList.remove("scrolled")

}

})

// play on hover cards

document.querySelectorAll(".game-card").forEach(card=>{

const video = card.querySelector("video")

card.addEventListener("mouseenter",()=>{

video.play()

})

card.addEventListener("mouseleave",()=>{

video.pause()

})

})

// game arrows

const container = document.querySelector(".game-container")

const leftBtn = document.getElementById("scrollLeft")

const rightBtn = document.getElementById("scrollRight")

rightBtn.addEventListener("click",()=>{

container.scrollBy({

left:300,

behavior:"smooth"

})

})

leftBtn.addEventListener("click",()=>{

container.scrollBy({

left:-300,

behavior:"smooth"

})

})

// categories open

const buttons = document.querySelectorAll(".category-list span")

const cards = document.querySelectorAll(".game-card")

buttons.forEach(button => {

button.addEventListener("click", () => {

let filter = button.dataset.filter

cards.forEach(card => {

if(filter === "all" || card.dataset.category === filter){

card.style.display = "flex"

}else{

card.style.display = "none"

}

})

})

})



// stars click

document.querySelectorAll(".user-rating").forEach(rating => {

const stars = rating.querySelectorAll("span")

stars.forEach((star, index) => {

star.addEventListener("click", () => {

stars.forEach(s => s.classList.remove("active"))

for(let i=0; i<=index; i++){
stars[i].classList.add("active")
}

})

})

})

//dark and light mode toggle

const toggle=document.getElementById("modeToggle")

toggle.addEventListener("click",()=>{

document.body.classList.toggle("light-mode")

})

//searchbar

const searchBar = document.getElementById("searchBar")

if(searchBar){

searchBar.addEventListener("keyup", function(){

let filter = searchBar.value.toLowerCase()

let cards = document.querySelectorAll(".game-card")

cards.forEach(card => {

let title = card.querySelector("h3")?.innerText.toLowerCase()

if(title && title.includes(filter)){
card.style.display="block"
}else{
card.style.display="none"
}

})

})

}

// scroll 
const slider = document.querySelector(".game-container")

let isDown = false
let startX
let scrollLeft

slider.addEventListener("mousedown", (e) => {

isDown = true
startX = e.pageX - slider.offsetLeft
scrollLeft = slider.scrollLeft

})

slider.addEventListener("mouseleave", () => {
isDown = false
})

slider.addEventListener("mouseup", () => {
isDown = false
})

slider.addEventListener("mousemove", (e) => {

if(!isDown) return

e.preventDefault()

const x = e.pageX - slider.offsetLeft
const walk = (x - startX) * 2

slider.scrollLeft = scrollLeft - walk

})


// scrollable images

const mediaCards = document.querySelectorAll(".game-card")

if(mediaCards.length > 0){

mediaCards.forEach(card => {

const media = card.querySelectorAll(".game-media img, .game-media iframe")
const dotsContainer = card.querySelector(".media-dots")

if(!dotsContainer || media.length === 0) return

let index = 0

media.forEach((_,i)=>{
let dot=document.createElement("span")
if(i===0) dot.classList.add("active")
dotsContainer.appendChild(dot)
})

const dots = dotsContainer.querySelectorAll("span")

media[index].classList.add("active")

setInterval(()=>{
media[index].classList.remove("active")
dots[index].classList.remove("active")

index = (index + 1) % media.length

const current = media[index]

if(current.tagName==="IFRAME" && !current.src){
current.src = current.dataset.src
}

current.classList.add("active")
dots[index].classList.add("active")

},3000)

})

}



function showToast(msg){

const toast = document.getElementById("toast")
const text = document.getElementById("toastText")

if(!toast || !text){
alert(msg) // fallback
return
}

text.innerText = msg

toast.classList.add("show")

setTimeout(()=>{
toast.classList.remove("show")
},2000)

}

document.addEventListener("DOMContentLoaded", ()=>{

const user = JSON.parse(localStorage.getItem("user"))

const authButtons = document.getElementById("authButtons")
const userSection = document.getElementById("userSection")
const avatar = document.getElementById("userAvatar")
const usernameText = document.getElementById("usernameText")

if(user){

authButtons.style.display = "none"
userSection.style.display = "flex"

avatar.src = `https://ui-avatars.com/api/?name=${user.username}&background=2c2c2c&color=fff`

usernameText.innerText = user.username

}

})

// rawg api integration

// rawg api integration

const API_KEY = "c2c2e9d687bf4ee3a175835c15593d86"

async function loadGames(){

console.log("LOADING RAWG GAMES...")

try{

const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`)
const data = await res.json()

console.log("RAWG DATA:", data)

displayGames(data.results)

}catch(err){
console.log("API ERROR:", err)
}

}

loadGames()

let currentPage = 1

async function loadMoreGames(){

currentPage++

try{

const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=12`)
const data = await res.json()

displayGames(data.results)

}catch(err){
console.log("LOAD MORE ERROR:", err)
}

}

const loadBtn = document.getElementById("loadMoreBtn")

if(loadBtn){
loadBtn.addEventListener("click", loadMoreGames)
}


// trending section game load






// 
function displayGames(games){

const container = document.querySelector(".game-container")
if(!container) return

games.forEach(game=>{

// SAFE IMAGE
const image = game.background_image 
? game.background_image 
: "https://via.placeholder.com/300x180?text=No+Image"

// SAFE RATING
const rating = game.rating || "N/A"

const card = document.createElement("div")
card.classList.add("game-card","api-card")

card.innerHTML = `
<div class="media-slider">
<img src="${image}">
</div>

<h3>${game.name}</h3>
<p>⭐ ${rating}</p>

<button class="review-btn">View Game</button>
<button class="save-btn">❤️ Save</button>
`

container.appendChild(card)

})

// 🔥 VERY IMPORTANT: RE-ATTACH EVENTS
attachDynamicEvents()

}




function attachDynamicEvents(){

// SAVE BUTTON (for API cards)
document.querySelectorAll(".save-btn").forEach(btn=>{

btn.onclick = async ()=>{

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
showToast("Login first ⚠️")
return
}

const card = btn.closest(".game-card")

const game = card.querySelector("h3").innerText
const image = card.querySelector("img").src

await fetch("https://reviewhallbackend.onrender.com/api/favorites/add",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
userId: user._id,
game,
image
})
})

showToast("Saved ❤️")

}

})

}


if(menuToggle && navMenu){
menuToggle.addEventListener("click",()=>{
navMenu.classList.toggle("active")
})
}


if(trending){
setInterval(()=>{
trending.scrollBy({left:250, behavior:"smooth"})
},3000)
}


document.querySelectorAll(".game-card").forEach(card=>{

const video = card.querySelector("video")

if(!video) return

card.addEventListener("mouseenter",()=> video.play())
card.addEventListener("mouseleave",()=> video.pause())

})



document.querySelectorAll(".game-card").forEach(card=>{

const video = card.querySelector("video")

if(!video) return

card.addEventListener("mouseenter",()=> video.play())
card.addEventListener("mouseleave",()=> video.pause())

})


if(container && leftBtn && rightBtn){
rightBtn.addEventListener("click",()=>{
container.scrollBy({left:300,behavior:"smooth"})
})

leftBtn.addEventListener("click",()=>{
container.scrollBy({left:-300,behavior:"smooth"})
})
}


function displayGames(games){

const container = document.getElementById("latestReviews")
if(!container) return

games.forEach(game=>{

const image = game.background_image || "https://via.placeholder.com/300x180"
const rating = game.rating || "N/A"

const row = document.createElement("div")
row.className = "game-row"

// 👉 CLICK → OPEN GAME PAGE
row.onclick = ()=>{
window.location.href = `pages/review.html?id=${game.id}`
}

row.innerHTML = `
<img src="${image}">

<div class="game-info">
<h3>${game.name}</h3>
<p>⭐ ${rating}</p>
</div>

<button class="save-btn">❤️</button>
`

container.appendChild(row)

})

// 🔥 attach save button
attachDynamicEvents()

}