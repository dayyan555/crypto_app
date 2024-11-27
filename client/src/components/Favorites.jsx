
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "../styles/Favorites.css"; // Import CSS file for Favorites component

const Favorites = ({ favorites, onSelectFavorite, coins }) => {
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    // Filter the coins data to include only the ones in the favorites list
    const filteredCoinsData = coins.filter((coin) =>
      favorites.includes(coin.id)  // Make sure `favorites` is an array of coin IDs
    );
    setCoinsData(filteredCoinsData);
  }, [coins, favorites]);

  return (
    <Box className="favorite-section">
      <Typography variant="h5" color="primary" gutterBottom>
        Favorite Coins
      </Typography>
      <div className="coin-grid">
        {coinsData.length > 0 ? (
          coinsData.map((coin) => (
            <div key={coin.id} className="coin-card" onClick={() => onSelectFavorite(coin)}>
              <img src={coin.image} alt={coin.name} className="coin-icon" />
              <div className="coin-info">
                <Typography variant="h6">{coin.name}</Typography>
                <Typography variant="body1" className="coin-price">
                  ${coin.current_price.toFixed(2)}
                </Typography>
                <Typography
                  variant="h1"
                  className={coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body1">No favorite coins yet.</Typography>
        )}
      </div>
    </Box>
  );
};

export default Favorites;
