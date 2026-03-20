const express = require("express")
const router = express.Router()

const Favorite = require("../models/Favorite")

// ADD FAVORITE
router.post("/add", async (req,res)=>{

const { userId, game, image } = req.body

const existing = await Favorite.findOne({ userId, game })

if(existing){
return res.json({ message: "Already saved" })
}

const fav = new Favorite({ userId, game, image })
await fav.save()

res.json({ success:true })

})

// GET FAVORITES
router.get("/:userId", async (req,res)=>{

const data = await Favorite.find({ userId: req.params.userId })

res.json(data)

})

// REMOVE FAVORITE
router.delete("/remove", async (req,res)=>{

const { userId, game } = req.body

await Favorite.deleteOne({ userId, game })

res.json({ success:true })

})

module.exports = router