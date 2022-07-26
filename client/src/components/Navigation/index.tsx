import React, { useContext } from 'react';
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

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
              <a href="/poems">Create a New Poem</a>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/users/login">Login</a>
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
