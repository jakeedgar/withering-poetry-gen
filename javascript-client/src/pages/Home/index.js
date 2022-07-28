import React from 'react';
import NavBar from '../../components/NavBar';
import '../../index.css';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <button className="btn-dark text-base ml-2">
        <a href="/login">Account</a>
      </button>
    </div>
  );
};

export default HomePage;
