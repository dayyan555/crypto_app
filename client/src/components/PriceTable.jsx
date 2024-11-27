
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "../styles/TablePrice.css"; // Ensure the path is correct

const PriceTable = ({ coins, toggleFavorite, favorites }) => {

  const handleToggleFavorite = (coinId) => {
    console.log(`Toggling favorite for coin with ID: ${coinId}`);
    toggleFavorite(coinId);
  };

  return (
    <section id="table-price" className="table-price-section">
      <div className="container">
        <div className="table-price-content">
          <Typography variant="h5" color="primary" gutterBottom>
            Coin Price
          </Typography>
          <div className="table-price-content__coin-list">
            {/* Table Header */}
            <div className="table-price-content__coin-list__top">
              <p className="coin-header">Coin</p>
              <p className="coin-header">Price</p>
              <p className="coin-header">24h Change</p>
            </div>
            {/* Coin Rows */}
            <div className="table-price-content__coin-list__row">
              {coins.length > 0 ? (
                coins.map((coin) => {
                  
                  
                  // Check if the coin's ID is in the favorites list
                  const isFavorite = favorites.includes(coin.id);
            

                  return (
                    <div className="coin-row" key={coin.id}>
                      <div className="coin-row__name">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="coin-row__image"
                        />
                        {coin.name}
                      </div>
                      <p className="coin-row__price">
                        {coin.current_price ? `$ ${coin.current_price.toFixed(2)}` : "N/A"}
                      </p>
                      <p
                        className={
                          "coin-row__change " +
                          (coin.price_change_percentage_24h >= 0
                            ? "green-text"
                            : "red-text")
                        }
                      >
                        {coin.price_change_percentage_24h?.toFixed(2) + " %"}
                      </p>
                      {/* Favorite button */}
                      <button
                        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
                        onClick={() => handleToggleFavorite(coin.id)}
                      >
                        {isFavorite ? "❤️" : "🤍"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <Typography variant="body1">No coins available.</Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceTable;
