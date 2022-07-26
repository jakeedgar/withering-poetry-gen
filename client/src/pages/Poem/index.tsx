import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import IPoem from '../../interfaces/poem';
import config from '../../config/config';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import IUser from '../../interfaces/user';
import ErrorText from '../../components/ErrorText';
import UserContext from '../../contexts/user';
import { RouteComponentProps } from '../../interfaces/interfaces';

export interface IPoemPageProps {}

const PoemPage: React.FC<RouteComponentProps<any>> = (props) => {
  const [_id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [poem, setPoem] = useState<IPoem | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const { user } = useContext(UserContext).userState;
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let _poemId = params.poemID;

    if (_poemId) {
      setId(_poemId);
    } else {
      navigate('/', { replace: true });
    }
  });
  useEffect(() => {
    if (_id !== '') getPoem();
    // eslint-disable-next-line
  }, [_id]);

  const getPoem = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/poems/read/${_id}`
      });

      if (response.status === 200 || response.status === 304) {
        setPoem(response.data.poem);
      } else {
        setError(`unable to retrieve the poem with id ${_id}`);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePoem = async () => {
    setDeleting(true);

    try {
      const response = await axios({
        method: 'DELETE',
        url: `${config.server.url}/poems/${_id}`
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        setError(`unable to delete poem with id ${_id}`);
        setDeleting(false);
      }
    } catch (error: any) {
      setError(error.message);
      setDeleting(false);
    }
  };

  if (loading) <LoadingComponent>Loading poem...</LoadingComponent>;

  if (poem) {
    return (
      <div className="container">
        <Navigation />
        <Header title={poem.title}></Header>
        <p className="text-light">
          Created by: {(poem.creator as IUser).name} on {new Date(poem.createdAt).toLocaleString()}
        </p>
        <div className="flex-container">
          {user._id === (poem.creator as IUser)._id && (
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
