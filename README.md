# Cryptocurrency Price Tracker

## Description
This project is a simple cryptocurrency price tracker built with the MERN (MongoDB, Express, React, Node.js) stack. The page displays live prices of selected cryptocurrencies (Bitcoin, Ethereum, and Dogecoin) in real-time, with data fetched from an API. Users can also store their favorite cryptocurrency and have it displayed by default on subsequent visits.

## Features
- **Real-Time Cryptocurrency Price Tracker**: Fetches live price data for Bitcoin, Ethereum, and Dogecoin from the CoinGecko API.
- **User Favorites**: Stores the user's favorite cryptocurrency in a database and displays it by default when they visit.
- **Auto-refresh**: The data is automatically refreshed every 10 seconds.
- **Charting**: Displays the price data using a charting library like Chart.js or Recharts.
- **Sorting**: Allows sorting by price or name (Bonus feature).
- **Styling**: Built with Material-UI or TailwindCSS for a modern design.

## Tech Stack
- **Frontend**: React.js, Material-UI (or TailwindCSS), Chart.js (or Recharts)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: CoinGecko API (for real-time cryptocurrency data)

## Installation

### Backend (Server)
1. Clone the repository:
    ```bash
    git clone https://github.com/dayyan555/crypto-app.git
    ```
2. Navigate to the `server` directory:
    ```bash
    cd server
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the `server` directory and set up necessary environment variables (e.g., MongoDB URI, API keys).
5. Run the server:
    ```bash
    npm start
    ```

### Frontend (Client)
1. Navigate to the `client` directory:
    ```bash
    cd client
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```

## Usage

1. After setting up both the backend and frontend, open your browser and go to `http://localhost:3000` to view the cryptocurrency price tracker page.
2. The page will display the live prices for Bitcoin, Ethereum, and Dogecoin.
3. The data will refresh every 10 seconds to provide the latest prices.
4. You can store your favorite cryptocurrency, and it will be shown by default when you visit the page next time.

## Bonus Features (Optional)

- **Sorting**: Click on the column headers in the table to sort by cryptocurrency name or price.
- **Styling**: Material-UI or TailwindCSS is used for a polished and responsive design.

## Contributing

Feel free to fork this repository, open an issue, or submit a pull request if you'd like to contribute.

## License

This project is licensed under the MIT License.
