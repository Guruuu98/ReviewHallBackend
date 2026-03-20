const mongoose = require("mongoose")

const FavoriteSchema = new mongoose.Schema({
userId: String,
game: String,
image: String
})

module.exports = mongoose.model("Favorite", FavoriteSchema)