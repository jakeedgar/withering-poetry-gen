import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import AuthRoute from "./components/AuthRoute";
import firebaseConfig from "./config/firebase";

const app = initializeApp(firebaseConfig);

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
        <Route path="/login" element={<LoginPage children={undefined} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
