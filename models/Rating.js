const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({

userId:String,
gameId:String,
rating:Number

})

module.exports = mongoose.model("Rating", ratingSchema)