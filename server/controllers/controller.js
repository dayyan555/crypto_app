const Favorite = require('../models/model');

// Get user favorites
const getFavorites = async (req, res) => {
  try {
    const { userId } = req; // Access userId directly from req (it's a string now)
    console.log("Fetching favorites for user ID:", userId);

    const userFavorites = await Favorite.findOne({ userId });

    if (!userFavorites) {
      console.log("No favorites found for user ID:", userId);
      return res.status(200).json({ favorites: [] }); // Return empty array if no favorites
    }

    console.log("User favorites found:", userFavorites);
    res.status(200).json(userFavorites); // Send the user's favorites
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user favorites (add/remove coin)
const updateFavorites = async (req, res) => {
  try {
    const { userId } = req; // Access userId directly from req (it's a string now)
    const { coinId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing or invalid' });
    }

    console.log("Received request to update favorites for user:", userId);
    console.log("Coin ID to toggle:", coinId);

    let userFavorites = await Favorite.findOne({ userId });

    if (!userFavorites) {
      // If no favorites exist, create a new list with the coinId
      console.log("No favorites found, creating new favorite list for user:", userId);
      userFavorites = new Favorite({ userId, favorites: [coinId] });
    } else {
      // Toggle the favorite status for the coinId
      if (userFavorites.favorites.includes(coinId)) {
        console.log("Coin already in favorites, removing it.");
        userFavorites.favorites = userFavorites.favorites.filter((id) => id !== coinId);
      } else {
        console.log("Coin not in favorites, adding it.");
        userFavorites.favorites.push(coinId);
      }
    }

    await userFavorites.save();
    console.log("Updated user favorites:", userFavorites);
    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error updating favorites:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getFavorites, updateFavorites };
