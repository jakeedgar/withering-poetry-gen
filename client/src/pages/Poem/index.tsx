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
import { getFirestore, collection, deleteDoc, doc, updateDoc, getDocs } from '@firebase/firestore';
import app from '../../config/firebase';
import GetPoem from '../../components/PoemComponents/getPoem';

export interface IPoemPageProps {}

const PoemPage: React.FC<IPoemPageProps> = (props) => {
  const db = getFirestore(app);

  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [poems, setPoems] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [newPoems, setNewPoems] = useState<string>('');
  const [deleting, setDeleting] = useState<boolean>(false);

  const poemsCollectionRef = collection(db, 'poems');

  const navigate = useNavigate();

  const updatePoem = async (id: string, content: string) => {
    const poemsDoc = doc(db, 'poems', id);
    const newFields = { content: content.concat('add this to the content.') };
    await updateDoc(poemsDoc, newFields);
  };

  const deletePoems = async (id: string) => {
    const poemsDoc = doc(db, 'poems', id);
    await deleteDoc(poemsDoc);
  };

  const logTester = async () => {
    const Poem = poemsCollectionRef.path;
    const poemDocs = await getDocs(poemsCollectionRef);
    const PoemData = poemDocs.docs;
    setPoems(
      poemDocs.docs.map((poemDoc) => {
        ({ ...poemDoc.data(), poems: poemDoc.get('poems') });
      })
    );
  };

  return (
    <div>
      <GetPoem />
    </div>
  );
};

export default PoemPage;
