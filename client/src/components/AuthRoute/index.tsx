import React, { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/user';
import logging from '../../config/logging';

export interface IAuthRouteProps {
  children: any;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (userContext.userState.user._id === '' || user === null) {
        logging.info('Unauthorized, redirecting');
        return navigate('/users/login');
      } else {
        return <>{children}</>;
      }
    });

    return () => AuthCheck();
  }, [auth]);

  if (loading) return <p>loading ...</p>;

  return <>{children}</>;
};

export default AuthRoute;
