// PAGE LOAD ANIMATION
window.addEventListener("load", ()=>{
document.body.classList.add("loaded")
})

// PAGE EXIT ANIMATION
document.querySelectorAll("a").forEach(link=>{
link.addEventListener("click", function(e){

const href = this.getAttribute("href")

if(href && href.includes(".html")){
e.preventDefault()
document.body.classList.add("fade-out")

setTimeout(()=>{
window.location.href = href
},400)
}

})
})

// CURSOR GLOW SAFE
const glow = document.querySelector(".cursor-glow")
if(glow){
document.addEventListener("mousemove", (e)=>{
glow.style.left = e.clientX + "px"
glow.style.top = e.clientY + "px"
})
}

// sign up to login vice versa
function goSignup(){
document.body.classList.add("fade-out")
setTimeout(()=>{
window.location.href = "signup.html"
},400)
}

function goLogin(){
document.body.classList.add("fade-out")
setTimeout(()=>{
window.location.href = "login.html"
},400)
}

// WAIT FOR DOM
document.addEventListener("DOMContentLoaded", ()=>{

console.log("LOGIN JS LOADED ✅")

let isLogin = false   // signup page default

const toggle = document.getElementById("toggleForm")
const title = document.getElementById("formTitle")
const btn = document.getElementById("submitBtn")
const message = document.getElementById("message")

// PASSWORD EYE FIX
const eye = document.getElementById("toggleEye")
const pass = document.getElementById("password")

if(eye && pass){
eye.addEventListener("click", ()=>{
if(pass.type === "password"){
pass.type = "text"
eye.innerText = "🙈"
}else{
pass.type = "password"
eye.innerText = "👁️"
}
})
}

// SAFETY CHECK
if(!btn){
console.error("Button not found ❌")
return
}

// OPTIONAL TOGGLE
if(toggle && title){

toggle.addEventListener("click", (e)=>{
e.preventDefault()

isLogin = !isLogin

title.innerText = isLogin ? "Login" : "Sign Up"
btn.innerText = isLogin ? "Login" : "Sign Up"
toggle.innerText = isLogin ? "Sign Up" : "Login"

})

}

// LOGIN / SIGNUP BUTTON
btn.addEventListener("click", async ()=>{

console.log("BUTTON CLICKED ✅")

const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")

const username = usernameInput ? usernameInput.value.trim() : ""
const email = emailInput ? emailInput.value.trim() : ""
const password = passwordInput ? passwordInput.value.trim() : ""

// 🚀 NEW: EMAIL VALIDATION
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email)){
showToast("Enter valid email ❌")
return
}

// 🚀 NEW: PASSWORD VALIDATION
if(password.length < 6){
showToast("Password must be at least 6 characters ❌")
return
}

// 🚀 NEW: USERNAME REQUIRED (ONLY SIGNUP)
if(!isLogin && !username){
showToast("Username required ❌")
return
}

// EXISTING CHECK
if(!email || !password){
if(message) showToast("Fill all fields ⚠️")
return
}

try{

const url = isLogin
? "https://reviewhallbackend.onrender.com/api/auth/login"
: "https://reviewhallbackend.onrender.com/api/auth/signup"

const res = await fetch(url,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
username,
email,
password
})
})

// CHECK RESPONSE
if(!res.ok){
throw new Error("Server error")
}

const data = await res.json()

console.log("Response:", data)

// HANDLE RESPONSE
if(data && data.user){

showToast(
isLogin
? "Login Successful ✅"
: "Signup Successful 🎉"
)

// SAVE USER
localStorage.setItem("user", JSON.stringify(data.user))

// REDIRECT
setTimeout(()=>{
window.location.href = "../index.html"
},1200)

}else{

showToast(data.message || "Invalid credentials ❌")

}

}catch(err){
console.log("SIGNUP ERROR:", err)  // 🔥 VERY IMPORTANT
res.status(500).json({
message:"Server error",
error: err.message
})
}

})

// 🎮 PARALLAX EFFECT
const columns = document.querySelectorAll(".poster-column")

if(columns.length > 0){

document.addEventListener("mousemove", (e)=>{

let x = (window.innerWidth / 2 - e.clientX) / 100
let y = (window.innerHeight / 2 - e.clientY) / 100

columns.forEach((col, index)=>{
col.style.transform = `translate(${x*(index+1)}px, ${y*(index+1)}px)`
})

})

}

})

// UI TOAST
function showToast(msg){

const toast = document.getElementById("toast")
const text = document.getElementById("toastText")

if(!toast || !text) return

text.innerText = msg

toast.classList.add("show")

setTimeout(()=>{
toast.classList.remove("show")
},2000)

}