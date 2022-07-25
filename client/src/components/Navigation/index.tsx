import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };
  return (
    <nav className="navbar-dark">
      <div className="container">
        {user._id !== '' ? (
          <ul>
            <li>
              <a href="/create">Create a New Poem</a>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li className="ml-2 mr-2">|</li>
              <li>
                <a href="/register">Sign Up</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
