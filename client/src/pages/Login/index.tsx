import React, { useContext, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import IPageProps from '../../interfaces/page';
import CenterPiece from '../../components/CenterPiece';
import ErrorText from '../../components/ErrorText';
import LoadingComponent from '../../components/LoadingComponent';

export interface ILoginPageProps {
  children: React.ReactNode;
}

const LoginPage: React.FC<IPageProps> = (props) => {
  const [authorizing, setAuthorizing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const isLogin = window.location.pathname.includes('login');
  const userContext = useContext(UserContext);

  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    if (error !== '') {
      setError('');
    }
    setAuthorizing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        logging.info(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
        logging.info(error);
        setAuthorizing(false);
      });
  };

  return (
    <CenterPiece>
      <div className="card">
        <div className="card-body">
          <ErrorText error={error} />
          <button className="btn-default" onClick={() => signInWithGoogle()} disabled={authorizing}>
            Sign {isLogin ? 'in' : 'up'} with Google
          </button>
          {authorizing && <LoadingComponent card={false} children={undefined} />}
        </div>
      </div>
    </CenterPiece>
  );
};

export default LoginPage;
