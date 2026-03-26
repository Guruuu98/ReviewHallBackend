const user = JSON.parse(localStorage.getItem("user"))

if(!user){
window.location.href = "login.html"
}

// SHOW USER
document.getElementById("profileInfo").innerHTML = `
<h2>${user.username}</h2>
<p>${user.email}</p>
`

// LOAD FAVORITES
async function loadFavorites(){

const res = await fetch(`https://reviewhallbackend.onrender.com/api/favorites/${user._id}`)
const data = await res.json()

const container = document.getElementById("favorites")

container.innerHTML = ""

data.forEach(game=>{

container.innerHTML += `
<div class="game-card">
<img src="${game.image}">
<h3>${game.game}</h3>
<button onclick="removeGame('${game.game}')">Remove</button>
</div>
`

})

}

loadFavorites()

// REMOVE
async function removeGame(game){

await fetch("https://reviewhallbackend.onrender.com/api/favorites/remove",{
method:"DELETE",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
userId:user._id,
game
})
})

loadFavorites()

}