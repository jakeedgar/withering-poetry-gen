import React, { useContext, useState } from 'react';
import { getAuth, AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import CenterPiece from '../../components/CenterPiece';
import ErrorText from '../../components/ErrorText';
import LoadingComponent from '../../components/LoadingComponent';
import SignInWithSocialMedia from '../../hooks/useSignOnWithProvider';
import { Authenticate } from '../../modules/Auth';

export interface ILoginPageProps {
  children: React.ReactNode;
}

const LoginPage: React.FC<ILoginPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const isLogin = window.location.pathname.includes('login');
  const userContext = useContext(UserContext);

  const auth = getAuth();
  const google = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithSocialMedia = (provider: AuthProvider) => {
    if (error !== '') setError('');

    setAuthenticating(true);

    SignInWithSocialMedia(auth, provider)
      .then(async (result: any) => {
        logging.info(result);

        let user = result.user;

        if (user) {
          let uid = user.uid;
          let name = user.displayName;

          if (name) {
            try {
              let fire_token = await user.getIdToken();

              Authenticate(uid, name, fire_token, (error, _user) => {
                if (error) {
                  setError(error);
                  setAuthenticating(false);
                } else if (_user) {
                  userContext.userDispatch({ type: 'login', payload: { user: _user, fire_token } });
                  navigate('/', { replace: true });
                }
              });
            } catch (error) {
              setError('Invalid Token.');
              logging.error(error);
              setAuthenticating(false);
            }
          } else {
            setError('Check Login Information.');
            logging.error(error);
            setAuthenticating(false);
          }
        } else {
          setError('Check Login Information.');
          logging.error(error);
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  /** 
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

  */

  return (
    <CenterPiece>
      <div className="card">
        <div className="card-body">
          <ErrorText error={error} />
          <button className="btn-default" onClick={() => signInWithSocialMedia(google)} disabled={authenticating}>
            Sign {isLogin ? 'in' : 'up'} with Google
          </button>
          <button onClick={() => console.log(userContext)}>test</button>
          {authenticating && <LoadingComponent card={false} children={undefined} />}
        </div>
      </div>
    </CenterPiece>
  );
};

export default LoginPage;
