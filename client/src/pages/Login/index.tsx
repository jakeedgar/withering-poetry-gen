import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthorizing(false);
      });
  };

  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => signInWithGoogle()} disabled={authorizing}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
