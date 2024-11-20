// import React, { useEffect, useState } from 'react';
// import { Box, Typography } from '@mui/material';
// import axios from 'axios';
// import '../styles/Favorites.css'; // Import CSS file for Favorites component

// const Favorites = () => {
//   const [favoriteCoins, setFavoriteCoins] = useState([]); // To store user's favorite coin IDs
//   const [coinsData, setCoinsData] = useState([]); // To store all coin data
//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=`; // URL for all coins data

//   // Fetch user's favorite coins from the server
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const storedUserId = localStorage.getItem('userId');
//       if (!storedUserId) return;

//       try {
//         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/favorites`, {
//           headers: { 'x-user-id': storedUserId },
//         });
//         setFavoriteCoins(response.data.favorites); // Set the user's favorite coin IDs
//       } catch (error) {
//         console.error('Error fetching favorite coins:', error);
//       }
//     };

//     fetchFavorites();
//   }, []); // Empty dependency array to run once on mount

//   // Fetch all coins data
//   useEffect(() => {
//     const fetchCoinDetails = async () => {
//       try {
//         const response = await axios.get(url); // Fetch all coins market data
//         setCoinsData(response.data); // Store the coins data
//       } catch (error) {
//         console.error('Error fetching coin details:', error);
//       }
//     };

//     fetchCoinDetails();
//   }, []); // Empty dependency array to run once on mount

//   // Filter the coins data to only include favorite coins
//   const favoriteCoinDetails = coinsData.filter((coin) => favoriteCoins.includes(coin.id));

//   return (
//     <Box className="favorite-section">
//       <Typography variant="h5" color="primary" gutterBottom>
//         Favorite Coins
//       </Typography>
//       <div className="coin-grid">
//         {favoriteCoinDetails.length > 0 ? (
//           favoriteCoinDetails.map((coin) => (
//             <div key={coin.id} className="coin-card">
//               <img src={coin.image} alt={coin.name} className="coin-icon" />
//               <div className="coin-info">
//                 <Typography variant="h6">{coin.name}</Typography>
//                 <Typography variant="body1" className="coin-price">
//                   ${coin.current_price.toFixed(2)}
//                 </Typography>
//                 <Typography variant="body1" className={coin.price_change_percentage_24h < 0 ? 'red' : 'green'}>
//                   24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
//                 </Typography>
//               </div>
//             </div>
//           ))
//         ) : (
//           <Typography variant="body2" color="textSecondary">
//             No favorite coins yet!
//           </Typography>
//         )}
//       </div>
//     </Box>
//   );
// };

// export default Favorites;
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/Favorites.css'; // Import CSS file for Favorites component

const Favorites = () => {
  const [favoriteCoins, setFavoriteCoins] = useState([]); // To store user's favorite coin IDs
  const [coinsData, setCoinsData] = useState([]); // To store all coin data
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=`; // URL for all coins data

  // Fetch user's favorite coins from the server
  useEffect(() => {
    const fetchFavorites = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) return;

      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/favorites`, {
          headers: { 'x-user-id': storedUserId },
        });
        setFavoriteCoins(response.data.favorites); // Set the user's favorite coin IDs
      } catch (error) {
        console.error('Error fetching favorite coins:', error);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array to run once on mount

  // Fetch all coins data
  const fetchCoinDetails = async () => {
    try {
      const response = await axios.get(url); // Fetch all coins market data
      setCoinsData(response.data); // Store the coins data
    } catch (error) {
      console.error('Error fetching coin details:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCoinDetails();

    // Set interval to fetch coin data every 10 seconds
    const intervalId = setInterval(() => {
      console.log('Fetching new coin details...');
      fetchCoinDetails(); // Fetch latest coin data
    }, 10000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run once on mount

  // Filter the coins data to only include favorite coins
  const favoriteCoinDetails = coinsData.filter((coin) => favoriteCoins.includes(coin.id));

  // Debugging logs to ensure data is being updated
  useEffect(() => {
    console.log('Favorite coins:', favoriteCoins);
    console.log('Coins data:', coinsData);
  }, [favoriteCoins, coinsData]);

  return (
    <Box className="favorite-section">
      <Typography variant="h5" color="primary" gutterBottom>
        Favorite Coins
      </Typography>
      <div className="coin-grid">
        {favoriteCoinDetails.length > 0 ? (
          favoriteCoinDetails.map((coin) => (
            <div key={coin.id} className="coin-card">
              <img src={coin.image} alt={coin.name} className="coin-icon" />
              <div className="coin-info">
                <Typography variant="h6">{coin.name}</Typography>
                <Typography variant="body1" className="coin-price">
                  ${coin.current_price.toFixed(2)}
                </Typography>
                <Typography variant="body1" className={coin.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                  24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No favorite coins yet!
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default Favorites;
