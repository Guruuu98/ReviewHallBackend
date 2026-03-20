// signup
router.post("/signup", async (req,res)=>{

const user = new User(req.body)
await user.save()

res.json({message:"Signup successful", user})

})

// login
router.post("/login", async (req,res)=>{

const user = await User.findOne({email:req.body.email})

if(!user) return res.json({message:"User not found"})

if(user.password !== req.body.password)
return res.json({message:"Wrong password"})

res.json({message:"Login successful", user})

})