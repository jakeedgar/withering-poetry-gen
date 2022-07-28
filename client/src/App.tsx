import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import NewPoemPage from './pages/Create';
import AuthRoute from './components/AuthRoute';
import app from './config/firebase';
import PoemPage from './pages/Poem';

const firebase = app;

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
  const {} = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage children={undefined} />
            </AuthRoute>
          }
        />
        <Route
          path="/create"
          element={
            <AuthRoute>
              <NewPoemPage />
            </AuthRoute>
          }
        />
        <Route path="/poems" element={<PoemPage />} />
        <Route path="/login" element={<LoginPage children={undefined} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
