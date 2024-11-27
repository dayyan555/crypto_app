



import React, { useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import darkTheme from "../theme"; // Assuming you have a custom dark theme defined in `theme.js`
import Navbar from "./Navbar";
import PriceTable from "./PriceTable";
import Favorites from "./Favorites";
import Home from "./Home"; // Importing the Home component
import axios from "axios";

const MainPage = () => {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  const serverUrl = `${process.env.REACT_APP_SERVER_URL}`;

  // Fetching coins data from CoinGecko API
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,dogecoin",
              sparkline: false,
            },
          }
        );
        setCoins(response.data); // Update coins state
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData(); // Initial fetch
    const intervalId = setInterval(fetchCoinData, 10000); // Update data every 10 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);



  // Fetch favorites from the server
  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID is missing in localStorage.");
        return; // Exit if userId is not found
      }
      
      try {
        const response = await axios.get(`${serverUrl}/favorites`,  {
            headers: { 'x-user-id': userId },
        });
        setFavorites(response.data.favorites); // Update favorites state
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites(); // Fetch favorites on component mount
  }, [serverUrl]);

  // Add or remove a coin from favorites
  const toggleFavorite = async (coinId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is missing in localStorage.");
      return; // Exit if userId is not found
    }

    try {
      const response = await axios.post(
        `${serverUrl}/${coinId}`,
        { userId, coinId }
      );
      setFavorites(response.data.favorites); // Update favorites state
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  
  

  const handleSelectFavorite = (coin) => {
    setSelectedFavorite(coin);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          gap: "40px",
          backgroundColor: "background.default",
          maxWidth: "1200px", // Ensure everything stays aligned and doesn't stretch too wide
          margin: "0 auto", // Centers everything horizontally
        }}
      >
        {/* Home Component */}
        <Box sx={{ width: "140%" }} id="home">
          <Home />
        </Box>

        {/* Favorites Component */}
        <Box sx={{ width: "140%", height: "auto" }} id="favorites">
          <Favorites
            favorites={favorites}
            onSelectFavorite={handleSelectFavorite}
            coins={coins} // Passing coins data to Favorites
          />
        </Box>

        {/* Price Table */}
        <Box sx={{ width: "140%" }} id="price">
          <PriceTable
            coins={coins}
            favorites={favorites} // Pass the favorites array
            toggleFavorite={toggleFavorite} // Pass the toggleFavorite function
          />
        </Box>

        {/* Footer */}
        <Box sx={{ width: "140%", textAlign: "center", marginTop: "20px" }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            © 2024 Crypto Tracker. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainPage;
