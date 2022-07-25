import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;
  const auth = getAuth();

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };
  return (
    <div className="container">
      <nav className="navbar-dark text-light-light-4 mb-4">
        <h2 className="site-title">
          <a href="/">
            <em>wither [ai]</em>
          </a>
        </h2>
        <h6>an erasure poetry generator</h6>
        {user._id !== '' ? (
          <ul>
            <li>
              <a href="/create">Create a New Poem</a>
            </li>
            <li>
              <a onClick={() => signOut(auth)}>Logout</a>
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li className="ml-2 mr-2"></li>
              <li>
                <a href="/register">Sign Up</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
