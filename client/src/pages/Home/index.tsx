import * as React from 'react';
import { useState, useEffect } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import Navigation from '../../components/Navigation';
import './index.css';
import IPoem from '../../interfaces/poem';
import config from '../../config/config';
import axios from 'axios';
import logging from '../../config/logging';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorText from '../../components/ErrorText';
import IPageProps from '../../interfaces/page';
import Header from '../../components/Header';

const HomePage: React.FC<IPageProps> = (props) => {
  const { children } = props;
  const [poems, setPoems] = useState<IPoem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const auth = getAuth();
  useEffect(() => {
    GetAllPoems();
  }, []);

  const GetAllPoems = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/poems`
      });

      if (response.status === 200 || response.status === 304) {
        let poems = response.data.poems as IPoem[];
        poems.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
        setPoems(poems);
      }
    } catch (error) {
      logging.error(error);
      setError('Unable to get that poem friend ...');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  if (loading) {
    return <LoadingComponent>Loading</LoadingComponent>;
  }
  return (
    <div>
      <Navigation />
      <div className="container">
        <Header title={'Welcome to wither!'} children={''} />

        <button id="sign-out" className="btn-primary mr-2 mt-2" onClick={() => signOut(auth)}>
          Sign out
        </button>

        <p>{children}</p>
        <ErrorText error={error} />
      </div>
    </div>
  );
};

export default HomePage;
