const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }))

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/reviewhall")
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

app.listen(5000, ()=>{
console.log("Server running on port 5000 🚀")
})

const favoriteRoutes = require("./routes/favorite")

app.use("/api/favorites", favoriteRoutes)