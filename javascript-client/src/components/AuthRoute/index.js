import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logging from '../../config/logging';

const AuthRoute = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user === '' || user === null) {
        logging.info('Unauthorized, redirecting');
        return navigate('/login');
      } else {
        setIsAuth(true);
        navigate('/');
      }
    });

    return () => AuthCheck();
  }, [auth]);

  if (loading) {
    return <p>loading ...</p>;
  } else setLoading(false);

  return <>{children}</>;
};

export default AuthRoute;
