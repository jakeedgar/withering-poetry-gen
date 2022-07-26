import React, { useContext } from 'react';
import UserContext, { initialUserState } from '../../contexts/user';
import { AuthCredential, getAuth, signOut } from 'firebase/auth';

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  const auth = getAuth();

  return (
    <div className="container">
      <nav className="navbar-dark text-light-light-4 mb-4">
        <h2 className="site-title">
          <a href="/">
            <em>wither [ai]</em>
          </a>
        </h2>
        <h6>an erasure poetry generator</h6>
        {AuthCredential !== null ? (
          <ul>
            <li>
              <a href="/poems">Create a New Poem</a>
            </li>
            <li>
              <a onClick={() => signOut(auth)}>Logout</a>
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/poems/create">new poem</a>
              </li>
              <li className="ml-2 mr-2"></li>
              <li>
                <a href="/poems">your poems</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
