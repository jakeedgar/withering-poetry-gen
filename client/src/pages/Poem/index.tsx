import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import IPoem from '../../interfaces/poem';
import config from '../../config/config';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import IUser from '../../interfaces/user';
import ErrorText from '../../components/ErrorText';
import { RouteComponentProps } from '../../interfaces/interfaces';
import { getAuth } from 'firebase/auth';

export interface IPoemPageProps {}

const PoemPage: React.FC<RouteComponentProps<any>> = (props) => {
  const [_id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [poem, setPoem] = useState<IPoem | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const navigate = useNavigate();
  const params = useParams();
  const poemID = {};

  let user = {};

  useEffect(() => {
    let _poemId = poemID;
  }, []);

  const getPoem = async () => {};

  const deletePoem = async () => {
    setDeleting(true);
  };

  if (poem) {
    return (
      <div className="container">
        <Navigation />
        <Header title={poem.title}></Header>
        <p className="text-light">
          Created by: {(poem.creator as IUser).name} on {new Date(poem.createdAt).toLocaleString()}
        </p>
        <div className="flex-container">
          {user === (poem.creator as IUser)._id && (
            <div className="p-0">
              <button className="btn-error" onClick={() => deletePoem()}>
                Delete Me?
              </button>
            </div>
          )}
          <ErrorText error={error} />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default PoemPage;
