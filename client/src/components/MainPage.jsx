// import React, { useEffect, useState } from "react";
// import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
// import darkTheme from "../theme"; // Assuming you have a custom dark theme defined in `theme.js`
// import Navbar from "./Navbar";
// import PriceTable from "./PriceTable";
// import Favorites from "./Favorites";
// import Home from "./Home"; // Importing the Home component
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const MainPage = () => {
//   const [coins, setCoins] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedFavorite, setSelectedFavorite] = useState(null);


//   const addFavorite = (coin) => {
//     if (!favorites.some((fav) => fav.symbol === coin.symbol)) {
//       setFavorites((prev) => [...prev, coin]);
//     }
//   };

//   const removeFavorite = (symbol) => {
//     setFavorites((prev) => prev.filter((coin) => coin.symbol !== symbol));
//   };

//   const handleSelectFavorite = (coin) => {
//     setSelectedFavorite(coin);
//   };

//   // Prepare data for the chart (you can customize this part based on the available data)
//   const chartData = selectedFavorite ? [
//     { name: "24h", price: selectedFavorite.current_price },
//     { name: "24h Ago", price: selectedFavorite.current_price - 100 }, // Example data
//   ] : [];

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       {/* Navbar */}
//       <Navbar />

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           padding: "20px",
//           gap: "40px",
//           backgroundColor: "background.default",
//         }}
//       >
//         {/* Home Component */}
//         <Home /> {/* Add the Home component here */}

//         {/* Title */}
        

//         {/* Price Table */}
//         <Box sx={{ width: "100%", height: "80vh" }}>
//           <PriceTable coins={coins} addFavorite={addFavorite} />
//         </Box>

//         {/* Chart for Selected Favorite */}
//         {selectedFavorite && (
//           <Box sx={{ width: "100%", height: "300px" }}>
//             <Typography variant="h6" sx={{ color: "text.primary", textAlign: "center" }}>
//               {selectedFavorite.name} Price Chart
//             </Typography>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="price" stroke="#8884d8" />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//         )}

//         {/* Favorites Component */}
//         <Favorites 
//           favorites={favorites} 
//           removeFavorite={removeFavorite} 
//           onSelectFavorite={handleSelectFavorite} 
//         />

//         {/* Footer */}
//         <Typography
//           variant="body2"
//           sx={{
//             color: "text.secondary",
//             textAlign: "center",
//             marginTop: "20px",
//           }}
//         >
//           © 2024 Crypto Tracker. All rights reserved.
//         </Typography>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default MainPage;

import React, { useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import darkTheme from "../theme"; // Assuming you have a custom dark theme defined in `theme.js`
import Navbar from "./Navbar";
import PriceTable from "./PriceTable";
import Favorites from "./Favorites";
import Home from "./Home"; // Importing the Home component
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link as ScrollLink } from "react-scroll";

const MainPage = () => {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  const addFavorite = (coin) => {
    if (!favorites.some((fav) => fav.symbol === coin.symbol)) {
      setFavorites((prev) => [...prev, coin]);
    }
  };

  const removeFavorite = (symbol) => {
    setFavorites((prev) => prev.filter((coin) => coin.symbol !== symbol));
  };

  const handleSelectFavorite = (coin) => {
    setSelectedFavorite(coin);
  };

  // Prepare data for the chart (you can customize this part based on the available data)
  const chartData = selectedFavorite ? [
    { name: "24h", price: selectedFavorite.current_price },
    { name: "24h Ago", price: selectedFavorite.current_price - 100 }, // Example data
  ] : [];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Navbar */}
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
          maxWidth: "1200px", // Make sure everything stays aligned and doesn't stretch too wide
          margin: "0 auto", // Centers everything horizontally
        }}
      >
        {/* Home Component */}
        <Box sx={{ width: "140%" }} id="home">
          <Home /> {/* Home component */}
        </Box>

        {/* Favorites Component */}
        <Box sx={{ width: "140%", height: "auto" }} id="favorites">
          <Favorites 
            favorites={favorites} 
            removeFavorite={removeFavorite} 
            onSelectFavorite={handleSelectFavorite} 
          />
        </Box>

        {/* Price Table */}
        <Box sx={{ width: "140%" }} id="price">
          <PriceTable coins={coins} addFavorite={addFavorite} />
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
