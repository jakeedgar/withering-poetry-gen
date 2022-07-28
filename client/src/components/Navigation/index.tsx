import * as React from 'react';
import { AuthCredential, getAuth, signOut } from 'firebase/auth';

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  const auth = getAuth();

  return (
    <nav className="navbar-dark text-light-light-4 mb-4">
      <h2 className="site-title">
        <a href="/">
          <em>wither [ai]</em>
        </a>
      </h2>
      <p>an erasure poetry generator</p>
      {AuthCredential !== null ? (
        <ul>
          <li>
            <a href="/create">Create a New Poem</a>
          </li>
          <li>
            <a href="#" onClick={() => signOut(auth)}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <div>
          <ul>
            <li>
              <a href="/">home</a>
            </li>
            <li className="ml-2 mr-2"></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
