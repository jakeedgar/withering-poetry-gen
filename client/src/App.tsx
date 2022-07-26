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
  const [loading, setLoading] = useState<boolean>(true);

  const { poemSelector } = useParams();

  const userContextValues = {
    userState,
    userDispatch
  };

  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
