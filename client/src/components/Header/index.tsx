import * as React from 'react';

export interface IHeaderProps {
  height?: string;
  title: string;
  headline?: string;
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { height, title, headline, children } = props;

  let headerStyle = {
    background: 'primary-light-5',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    OBackgroundSize: 'cover',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: height
  };

  return (
    <header style={headerStyle}>
      <div className="container">
        <div className="row-flex gap-1 justify-center">
          <div className="col-sm-12 col md-6 col-lg-6">
            <h1 className="mt-5 mb-2">{title}</h1>
            <h3 className="mb-5 text-white">{headline}</h3>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  height: '100%'
};
export default Header;
