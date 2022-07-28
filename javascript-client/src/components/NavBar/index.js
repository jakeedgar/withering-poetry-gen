import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar-dark text-light-light-4 mb-4">
      <h2 className="site-title">
        <a href="/">
          <em>wither [ai]</em>
        </a>
      </h2>
      <h6>an erasure poetry generator</h6>
      <ul>
        <li>
          <a href="/poems">Poems</a>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About Erasure</a>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
