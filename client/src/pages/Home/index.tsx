import * as React from 'react';
import { signOut, getAuth } from 'firebase/auth';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

export interface IHomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const { children } = props;
  const auth = getAuth();

  return (
    <div>
      <Navigation />
      <div className="container-flex">
        <h2 className="ml-2 mb-3">Welcome to wither [ai]</h2>
        <p className="ml-2 mb-3">If you are tired of poems that sound nice and have deep meaning than you are in the right place!</p>
        <div className="ml-2 mb-3">
          <button className="btn-outlined-primary" onClick={() => signOut(auth)}>
            Sign out
          </button>
        </div>
      </div>
      <p>{children}</p>
    </div>
  );
};

export default HomePage;
