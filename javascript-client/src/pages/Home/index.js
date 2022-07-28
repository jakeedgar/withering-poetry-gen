import React from 'react';
import NavBar from '../../components/NavBar';
import '../../assets/css/index.css';
import '../../assets/css/glass.css';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="center-piece-blur">
        <h4>WELCOME TO WITHER!</h4>
        <p>This is a barely functional poem generator! Welcome!</p>
        <p>Check out your login functioning and everything!</p>
        <button className="btn-dark text-base mt-2">
          <a href="/login">Account</a>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
