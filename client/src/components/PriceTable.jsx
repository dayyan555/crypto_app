// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/TablePrice.css";

// function TablePrice() {
//   const [data, setData] = useState([]);
//   const [apiLoad, setApiLoad] = useState(true);
//   const [favorites, setFavorites] = useState([]); // State to track favorites

//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

//   function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       setApiLoad(true);
//       const response = await fetch(url);
//       const json = await response.json();
//       setData(json);
//       setApiLoad(false);
//     };
//     fetchData();
//   }, [url]);

//   // Filter data to include only Bitcoin, Ethereum, and Dogecoin
//   const filteredData = data.filter(
//     (item) => item.name === "Bitcoin" || item.name === "Ethereum" || item.name === "Dogecoin"
//   );

//   // Toggle favorite status
//   const toggleFavorite = (id) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.includes(id)
//         ? prevFavorites.filter((favId) => favId !== id)
//         : [...prevFavorites, id]
//     );
//   };

//   return (
//     <section id="table-price" className="table-price-section">
//       <div className="container">
//         <div className="table-price-content">
//           <h2>Coin Price</h2>
//           <div className="table-price-content__coin-list">
//             <div className="table-price-content__coin-list__top">
//               <p className="coin-header">Coin</p>
//               <p className="coin-header">Price</p>
//               <p className="coin-header">24h Change</p>
            
//             </div>
//             <div className="table-price-content__coin-list__row">
//               {apiLoad ? (
//                 <div className="loader">Loading...</div>
//               ) : (
//                 filteredData.map((item) => (
//                   <div className="coin-row" key={item.id}>
//                     <span className="coin-row__name">
//                       <img src={item.image} alt={item.name} className="coin-row__image" />
//                       {item.name}
//                     </span>
//                     <p className="coin-row__price">{`$ ${item.current_price.toFixed(2)}`}</p>
//                     <p
//                       className={
//                         "coin-row__change " +
//                         (item.price_change_percentage_24h >= 0 ? "green-text" : "red-text")
//                       }
//                     >
//                       {item.price_change_percentage_24h?.toFixed(2) + " %"}
//                     </p>
//                     {/* Favorite button */}
//                     <button
//                       className={`favorite-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
//                       onClick={(e) => {
//                         e.preventDefault(); // Prevent link navigation
//                         toggleFavorite(item.id);
//                       }}
//                     >
//                       {favorites.includes(item.id) ? "❤️" : "🤍"}
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TablePrice;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios"; // For making HTTP requests
// import "../styles/TablePrice.css";

// function TablePrice() {
//   const [data, setData] = useState([]);
//   const [apiLoad, setApiLoad] = useState(true);
//   const [favorites, setFavorites] = useState([]); // State to track favorites
//   const [userId, setUserId] = useState(null); // User ID

//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
//   const serverUrl =  `${process.env.REACT_APP_SERVER_URL}`; // Your server URL

//   function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       setApiLoad(true);
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         console.log("Fetched Data:", json);  // Log fetched data from CoinGecko
//         setData(json);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setApiLoad(false);
//       }
//     };
//     fetchData();
//   }, [url]);

//   // Get user's favorites from the server
// useEffect(() => {
//     const fetchFavorites = async () => {
//       if (userId) {
//         console.log("Fetching favorites for userId:", userId);
//         try {
//           const response = await axios.get(`${serverUrl}/favorites/${userId}`, {
//             headers: { 'x-user-id': userId }, // Send userId in header
//           });
//           console.log("Favorites response:", response.data);
//           setFavorites(response.data.favorites);
//         } catch (error) {
//           console.error("Error fetching favorites:", error);
//         }
//       }
//     };
  
//     if (userId) {
//       fetchFavorites();
//     }
//   }, [userId]); // Ensure useEffect runs only when userId changes

//   // Filter data to include only Bitcoin, Ethereum, and Dogecoin
//   const filteredData = data.filter(
//     (item) => item.name === "Bitcoin" || item.name === "Ethereum" || item.name === "Dogecoin"
//   );

//   const toggleFavorite = async (id) => {
//     console.log("Toggling favorite for coinId:", id);  // Ensure coinId is passed here
    
//     if (!id) {
//       console.error("coinId is undefined, cannot proceed with the request");
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_SERVER_URL}/coin/${id}`,  // Ensure id is correctly placed here
//         { coinId: id },
//         { headers: { "x-user-id": userId } }
//       );
  
//       console.log("Toggle favorite response:", response.data);
//       setFavorites((prevFavorites) =>
//         prevFavorites.includes(id)
//           ? prevFavorites.filter((favId) => favId !== id)
//           : [...prevFavorites, id]
//       );
//     } catch (error) {
//       console.error("Error updating favorites:", error);
//     }
//   };
  
  

//   // Set user ID (this can be set dynamically based on your app's logic)
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     console.log("Stored userId:", storedUserId);  // Log the stored userId
//     if (!storedUserId) {
//       const newUserId = Date.now().toString(); // Generate a new ID for now (can use a proper system)
//       localStorage.setItem("userId", newUserId); // Save userId in localStorage
//       setUserId(newUserId);
//       console.log("Generated new userId:", newUserId);  // Log the new userId
//     } else {
//       setUserId(storedUserId);
//       console.log("UserId from localStorage:", storedUserId);  // Log the userId from localStorage
//     }
//   }, []);

//   return (
//     <section id="table-price" className="table-price-section">
//       <div className="container">
//         <div className="table-price-content">
//           <h2>Coin Price</h2>
//           <div className="table-price-content__coin-list">
//             <div className="table-price-content__coin-list__top">
//               <p className="coin-header">Coin</p>
//               <p className="coin-header">Price</p>
//               <p className="coin-header">24h Change</p>
//             </div>
//             <div className="table-price-content__coin-list__row">
//               {apiLoad ? (
//                 <div className="loader">Loading...</div>
//               ) : (
//                 filteredData.map((item) => (
//                   <div className="coin-row" key={item.id}>
//                     <span className="coin-row__name">
//                       <img src={item.image} alt={item.name} className="coin-row__image" />
//                       {item.name}
//                     </span>
//                     <p className="coin-row__price">{`$ ${item.current_price.toFixed(2)}`}</p>
//                     <p
//                       className={
//                         "coin-row__change " +
//                         (item.price_change_percentage_24h >= 0 ? "green-text" : "red-text")
//                       }
//                     >
//                       {item.price_change_percentage_24h?.toFixed(2) + " %"}
//                     </p>
//                     {/* Favorite button */}
//                     <button
//                       className={`favorite-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
//                       onClick={(e) => {
//                         e.preventDefault(); // Prevent link navigation
//                         toggleFavorite(item.id);
//                       }}
//                     >
//                       {favorites.includes(item.id) ? "❤️" : "🤍"}
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TablePrice;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios"; // For making HTTP requests
// import "../styles/TablePrice.css";

// function TablePrice() {
//   const [data, setData] = useState([]);
//   const [apiLoad, setApiLoad] = useState(true);
//   const [favorites, setFavorites] = useState([]); // State to track favorites
//   const [userId, setUserId] = useState(null); // User ID

//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
//   const serverUrl =  `${process.env.REACT_APP_SERVER_URL}`; // Your server URL

//   function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   // Fetching coin data from CoinGecko
//   useEffect(() => {
//     const fetchData = async () => {
//       setApiLoad(true);
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         console.log("Fetched Data:", json);  // Log fetched data from CoinGecko
//         setData(json);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setApiLoad(false);
//       }
//     };
//     fetchData();
//   }, [url]);

//   // Get user's favorites from the server
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (userId) {
//         console.log("Fetching favorites for userId:", userId);
//         try {
//           const response = await axios.get(`${serverUrl}/favorites`, {
//             headers: { 'x-user-id': userId }, // Send userId in header
//           });
//           console.log("Favorites response:", response.data);
//           setFavorites(response.data.favorites);
//         } catch (error) {
//           console.error("Error fetching favorites:", error);
//         }
//       }
//     };
  
//     if (userId) {
//       fetchFavorites();
//     }
//   }, [userId]); // Ensure useEffect runs only when userId changes

//   // Filter data to include only Bitcoin, Ethereum, and Dogecoin
//   const filteredData = data.filter(
//     (item) => item.name === "Bitcoin" || item.name === "Ethereum" || item.name === "Dogecoin"
//   );

//   // Toggling favorite for a coin
//   const toggleFavorite = async (id) => {
//     console.log("Toggling favorite for coinId:", id);  // Ensure coinId is passed here
    
//     if (!id) {
//       console.error("coinId is undefined, cannot proceed with the request");
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         `${serverUrl}/${id}`,  // Ensure id is correctly placed here
//         { coinId: id },  // Send coinId in body
//         { headers: { "x-user-id": userId } } // Send userId in headers
//       );
  
//       console.log("Toggle favorite response:", response.data);
//       setFavorites((prevFavorites) =>
//         prevFavorites.includes(id)
//           ? prevFavorites.filter((favId) => favId !== id)
//           : [...prevFavorites, id]
//       );
//     } catch (error) {
//       console.error("Error updating favorites:", error);
//     }
//   };

//   // Set user ID (this can be set dynamically based on your app's logic)
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     console.log("Stored userId:", storedUserId);  // Log the stored userId
//     if (!storedUserId) {
//       const newUserId = Date.now().toString(); // Generate a new ID for now (can use a proper system)
//       localStorage.setItem("userId", newUserId); // Save userId in localStorage
//       setUserId(newUserId);
//       console.log("Generated new userId:", newUserId);  // Log the new userId
//     } else {
//       setUserId(storedUserId);
//       console.log("UserId from localStorage:", storedUserId);  // Log the userId from localStorage
//     }
//   }, []);

//   return (
//     <section id="table-price" className="table-price-section">
//       <div className="container">
//         <div className="table-price-content">
//           <h2>Coin Price</h2>
//           <div className="table-price-content__coin-list">
//             <div className="table-price-content__coin-list__top">
//               <p className="coin-header">Coin</p>
//               <p className="coin-header">Price</p>
//               <p className="coin-header">24h Change</p>
//             </div>
//             <div className="table-price-content__coin-list__row">
//               {apiLoad ? (
//                 <div className="loader">Loading...</div>
//               ) : (
//                 filteredData.map((item) => (
//                   <div className="coin-row" key={item.id}>
//                     <span className="coin-row__name">
//                       <img src={item.image} alt={item.name} className="coin-row__image" />
//                       {item.name}
//                     </span>
//                     <p className="coin-row__price">{`$ ${item.current_price.toFixed(2)}`}</p>
//                     <p
//                       className={ 
//                         "coin-row__change " + 
//                         (item.price_change_percentage_24h >= 0 ? "green-text" : "red-text")
//                       }
//                     >
//                       {item.price_change_percentage_24h?.toFixed(2) + " %"}
//                     </p>
//                     {/* Favorite button */}
//                     <button
//                       className={`favorite-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
//                       onClick={(e) => {
//                         e.preventDefault(); // Prevent link navigation
//                         toggleFavorite(item.id);
//                       }}
//                     >
//                       {favorites.includes(item.id) ? "❤️" : "🤍"}
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TablePrice;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // For making HTTP requests
import "../styles/TablePrice.css";

function TablePrice() {
  const [data, setData] = useState([]);
  const [apiLoad, setApiLoad] = useState(true);
  const [favorites, setFavorites] = useState([]); // State to track favorites
  const [userId, setUserId] = useState(null); // User ID

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
  const serverUrl =  `${process.env.REACT_APP_SERVER_URL}`; // Your server URL

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Fetching coin data from CoinGecko
  useEffect(() => {
    const fetchData = async () => {
      setApiLoad(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("Fetched Data:", json);  // Log fetched data from CoinGecko
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setApiLoad(false);
      }
    };

    fetchData(); // Fetch data initially

    // Set interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [url]); // Dependency array ensures the effect runs only when the url changes

  // Get user's favorites from the server
  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        console.log("Fetching favorites for userId:", userId);
        try {
          const response = await axios.get(`${serverUrl}/favorites`, {
            headers: { 'x-user-id': userId }, // Send userId in header
          });
          console.log("Favorites response:", response.data);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]); // Ensure useEffect runs only when userId changes


  // Filter data to include only Bitcoin, Ethereum, and Dogecoin
  const filteredData = data
    .filter(
      (item) => item.name === "Bitcoin" || item.name === "Ethereum" || item.name === "Dogecoin"
    )
    .sort((a, b) => a.name.localeCompare(b.name)); // Sorting by coin name alphabetically

  // Toggling favorite for a coin
  const toggleFavorite = async (id) => {
    console.log("Toggling favorite for coinId:", id);  // Ensure coinId is passed here
    
    if (!id) {
      console.error("coinId is undefined, cannot proceed with the request");
      return;
    }
  
    try {
      const response = await axios.post(
        `${serverUrl}/${id}`,  // Ensure id is correctly placed here
        { coinId: id },  // Send coinId in body
        { headers: { "x-user-id": userId } } // Send userId in headers
      );
  
      console.log("Toggle favorite response:", response.data);
      setFavorites((prevFavorites) =>
        prevFavorites.includes(id)
          ? prevFavorites.filter((favId) => favId !== id)
          : [...prevFavorites, id]
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Set user ID (this can be set dynamically based on your app's logic)
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId:", storedUserId);  // Log the stored userId
    if (!storedUserId) {
      const newUserId = Date.now().toString(); // Generate a new ID for now (can use a proper system)
      localStorage.setItem("userId", newUserId); // Save userId in localStorage
      setUserId(newUserId);
      console.log("Generated new userId:", newUserId);  // Log the new userId
    } else {
      setUserId(storedUserId);
      console.log("UserId from localStorage:", storedUserId);  // Log the userId from localStorage
    }
  }, []);

  return (
    <section id="table-price" className="table-price-section">
      <div className="container">
        <div className="table-price-content">
          <h2>Coin Price</h2>
          <div className="table-price-content__coin-list">
            <div className="table-price-content__coin-list__top">
              <p className="coin-header">Coin</p>
              <p className="coin-header">Price</p>
              <p className="coin-header">24h Change</p>
            </div>
            <div className="table-price-content__coin-list__row">
              {apiLoad ? (
                <div className="loader">Loading...</div>
              ) : (
                filteredData.map((item) => (
                  <div className="coin-row" key={item.id}>
                    <span className="coin-row__name">
                      <img src={item.image} alt={item.name} className="coin-row__image" />
                      {item.name}
                    </span>
                    <p className="coin-row__price">{`$ ${item.current_price.toFixed(2)}`}</p>
                    <p
                      className={ 
                        "coin-row__change " + 
                        (item.price_change_percentage_24h >= 0 ? "green-text" : "red-text")
                      }
                    >
                      {item.price_change_percentage_24h?.toFixed(2) + " %"}
                    </p>
                    {/* Favorite button */}
                    <button
                      className={`favorite-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link navigation
                        toggleFavorite(item.id);
                      }}
                    >
                      {favorites.includes(item.id) ? "❤️" : "🤍"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TablePrice;
