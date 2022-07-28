import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface ILoginPageProps {
  children: React.ReactNode;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authorizing, setAuthorizing] = useState(false);

  const signInWithGoogle = async () => {
    setAuthorizing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthorizing(false);
      });
  };

  return (
    <div>
      <h2 className="mt-3 ml-2 mb-3">Welcome to wither [ai]</h2>
      <p className="ml-2 mb-3">If you are tired of poems that sound nice and have deep meaning than you are in the right place!</p>
      <div className="ml-2 mb-3">
        <button className="btn-dark text-light" onClick={() => signInWithGoogle()} disabled={authorizing}>
          Sign in with Google
        </button>
      </div>
      <p className="ml-2 mb-3">Login Page</p>
    </div>
  );
};

export default LoginPage;
