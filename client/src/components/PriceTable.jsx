import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "../styles/TablePrice.css"; 

const PriceTable = ({ coins, toggleFavorite, favorites }) => {
  const [sortBy, setSortBy] = useState("price"); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  const handleToggleFavorite = (coinId) => {
    console.log(`Toggling favorite for coin with ID: ${coinId}`);
    toggleFavorite(coinId);
  };

  // Function to handle sorting
  const sortCoins = (coins) => {
    return coins.sort((a, b) => {
      if (sortBy === "price") {
        // Sort by price
        return sortOrder === "asc"
          ? a.current_price - b.current_price
          : b.current_price - a.current_price;
      } else if (sortBy === "name") {
        // Sort by name
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
  };

  // Sorted coins
  const sortedCoins = sortCoins(coins);

  return (
    <section id="table-price" className="table-price-section">
      <div className="container">
        <div className="table-price-content">
          <Typography variant="h3" color="while"  gutterBottom sx={{
    fontWeight: 'bold',  // Make text bold
    textAlign: 'left'   // Align text to the left
  }}
>
            Coin Price
          </Typography>

          {/* Sorting controls */}
          <div className="sorting-controls">
            <button onClick={() => setSortBy("price")}>Sort by Price</button>
            <button onClick={() => setSortBy("name")}>Sort by Name</button>
            <button
              onClick={() =>
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>

          <div className="table-price-content__coin-list">
            {/* Table Header */}
            <div className="table-price-content__coin-list__top">
              <p className="coin-header">Coin</p>
              <p className="coin-header">Price</p>
              <p className="coin-header">24h Change</p>
            </div>
            {/* Coin Rows */}
            <div className="table-price-content__coin-list__row">
              {sortedCoins.length > 0 ? (
                sortedCoins.map((coin) => {
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
