const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json())

// ✅ FIXED CORS
app.use(cors({
origin: [
"https://lustrous-moxie-30f173.netlify.app"
],
methods: ["GET","POST"],
credentials: true
}))

// CONNECT DB
mongoose.connect("")
.then(()=>console.log("MongoDB Connected ✅"))
.catch(err=>console.log(err))

// USER MODEL
const User = mongoose.model("User",{
username:String,
email:String,
password:String
})

/* SIGNUP */
app.post("/api/auth/signup", async(req,res)=>{

try{

const {username,email,password} = req.body

if(!username || !email || !password){
return res.json({message:"All fields required"})
}

// ✅ EMAIL FORMAT CHECK
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if(!emailRegex.test(email)){
return res.json({message:"Invalid email format"})
}

const existingUser = await User.findOne({email})

if(existingUser){
return res.json({message:"User already exists"})
}

const hash = await bcrypt.hash(password,10)

const user = new User({username,email,password:hash})
await user.save()

res.json({user})

}catch(err){
console.log(err)
res.status(500).json({message:"Server error"})
}

})

/* LOGIN */
app.post("/api/auth/login", async(req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.json({message:"User not found"})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.json({message:"Wrong password"})
}

res.json({user})

}catch(err){
console.log(err)
res.status(500).json({message:"Server error"})
}

})

// ✅ ROUTES (MOVED BEFORE LISTEN)
const favoriteRoutes = require("./routes/favorite")
app.use("/api/favorites", favoriteRoutes)

// ✅ FIXED PORT (VERY IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT} 🚀`)
})
