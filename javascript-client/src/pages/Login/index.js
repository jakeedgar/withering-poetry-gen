import React from 'react';
import NavBar from '../../components/NavBar';
import LoginComponent from '../../components/PoemComponents/LoginComponent';

const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className="card">
        <h3 className="card-title ml-3"> Your Account </h3>
        <div className="card-body">
          <LoginComponent />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
