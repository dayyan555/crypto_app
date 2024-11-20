import React from 'react';
import '../styles/Home.css'; // Import the corresponding CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Left Side (Text animation only) */}
      <div className="left-side">
        <div className="text-container">
          <h1 className="heading">
            <span className="heading-white">Unlock the</span> 
            <span className="heading-red"> Future of Crypto</span>
          </h1>
          <p className="subheading">Explore, Invest, and Grow with Cryptocurrency</p>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="right-side">
        <div className="image-container">
          <img src="/choose-main.png" alt="Crypto Image" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
