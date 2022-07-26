import * as React from 'react';
import { useReducer, useState, useEffect } from 'react';
import { userReducer, initialUserState, UserContextProvider } from './contexts/user';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import AuthRoute from './components/AuthRoute';
import firebaseConfig from './config/firebase';
import routes from './config/routes';
import LoadingComponent from './components/LoadingComponent';
import { Validate } from './modules/Auth';
import logging from './config/logging';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import PoemPage from './pages/Poem';
import NewPoemPage from './pages/NewPoem';

const app = initializeApp(firebaseConfig);

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
  const {} = props;
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [authStage, setAuthStage] = useState<string>('Checking Local Storage ...');
  const [loading, setLoading] = useState<boolean>(true);

  const { poemSelector } = useParams();

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);

    // eslint-disable-next-line
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage('Checking credentials ...');

    const fire_token = localStorage.getItem('fire_token');

    if (fire_token === null) {
      userDispatch({ type: 'logout', payload: initialUserState });
      setAuthStage('No credentials found');
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: 'logout', payload: initialUserState });
          setLoading(false);
        } else if (user) {
          userDispatch({ type: 'login', payload: { user, fire_token } });
          setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch
  };

  if (loading) {
    return <LoadingComponent>{authStage}</LoadingComponent>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="users">
            <Route index element={<HomePage />} />
            <Route path=":page" element={<LoginPage children={undefined} />} />
          </Route>
          <Route path="poems">
            <Route index element={<PoemPage />} />
            {/* <Route path=":poemSelector" element={<PoemPage />} /> */}
            <Route path=":poemSelector" element={<NewPoemPage />} />
          </Route>
        </Routes>
        {/* <Routes>
          {routes.map((route, index) => {
            if (route.auth) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthRoute>
                      <route.component />
                    </AuthRoute>
                  }
                />
              );
            }
            return <Route key={index} path={route.path} element={<route.component />} />;
          })}
        </Routes> */}
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
