import * as React from "react";
import { signOut, getAuth } from "firebase/auth";

export interface IHomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const { children } = props;
  const auth = getAuth();

  return (
    <div>
      <p>Home Page (Protected by Firebase!)</p>
      <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
      <p>{children}</p>
    </div>
  );
};

export default HomePage;
