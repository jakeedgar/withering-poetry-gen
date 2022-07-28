import React from 'react';
import NavBar from '../../components/NavBar';
import LoginComponent from '../../components/PoemComponents/LoginComponent';

const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className="card text-center">
        <h3 className="card-title ml-3"> My Account </h3>
        <div className="card-body">
          <LoginComponent />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
