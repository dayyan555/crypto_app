// model.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true }, // Index added for performance
  favorites: { type: [String], default: [] }, // Array to store coinIds
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
