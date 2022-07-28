import * as React from 'react';
import './index.css';

export interface IHeaderProps {
  title?: string;
  creator?: string;
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { title, creator, children } = props;

  return (
    <div className="flex-container">
      <div className="container-header">
        <div className="row-flex justify-center">
          <div className="col-sm-12 col md-6 col-lg-6">
            <h1 className="mt-5 mb-2 ml-3">{title}</h1>
            <h3 className="mb-5 text-dark ml-3">{creator}</h3>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
