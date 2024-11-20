// route.js
const express = require('express');
const { getFavorites, updateFavorites } = require('../controllers/controller');
const generateUserId = require('../middlewares/middleware');

const router = express.Router();

// Apply middleware to all routes
router.use(generateUserId);

// Routes
// Define the route for updating favorites
router.post('/:coinId', (req, res) => {
  console.log("POST request received at /coin/:coinId");
  console.log("Coin ID:", req.params.coinId);
  updateFavorites(req, res); // Pass the request and response to the controller
});

// Define the route for getting favorites by userId
router.get('/favorites', (req, res) => { // Use req.userId from middleware to get favorites
  console.log("GET request received at /coin");
  getFavorites(req, res); // This now uses req.userId from middleware
});

module.exports = router;
