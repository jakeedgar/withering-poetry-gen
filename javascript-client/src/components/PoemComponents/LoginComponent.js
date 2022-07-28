import { useState } from 'react';
import app from '../../config/firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import logging from '../../config/logging';
import '../../assets/css/index.css';

function LoginComponent() {
  const [user, setUser] = useState({});

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log(token);
        // The signed-in user info.
        const user = result.user;
        // console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // logging.info(errorCode);
        const errorMessage = error.message;
        // logging.info(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // logging.info(email);
        // The AuthCredential type that was used.
        const credential = provider.credentialFromError(error);
        // logging.info(credential);
        // ...
      });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="container">
      <h4 className="ml-2 mb-3">Welcome to wither [ai]</h4>
      <p className="ml-2 mb-3">If you are tired of poems that sound nice and have deep meaning than you are in the right place!</p>
      {user ? (
        <div className="ml-2">
          You are Logged in as: {user.email}
          <br />
          <button className="btn-warning mt-1" onClick={logout}>
            {' '}
            Sign Out{' '}
          </button>
        </div>
      ) : (
        <div className="ml-2">
          You are not logged in
          <br />
          <button className="btn-info mt-1" onClick={signInWithGoogle}>
            {' '}
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginComponent;
