import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { store } from '../../config/firestore';

export interface IGetPoemProps {
  title?: string;
  creator?: string;
  content?: string;
}

export const GetPoem: React.FC<IGetPoemProps> = (props) => {
  let { title, creator, content } = props;
  const [poem, setPoem] = useState<any>();
  const [newTitle, setNewTitle] = useState<any>();
  const [newCreator, setNewCreator] = useState<any>();
  const [newContent, setNewContent] = useState<any>();

  const poemsColRef = collection(store, 'poems');

  // useEffect(() => {
  //   const getPoems = async () => {
  //     const poemDocs = await getDocs(poemsColRef);
  //     setPoem(
  //       poemDocs.docs.map((poemDoc) => {
  //         ({ ...poemDoc.data(), poems: poemDoc.get('poems') });
  //       })
  //     );
  //   };

  //   getPoems();
  // }, []);

  const logTester = async () => {
    console.log(store);
  };
  if (poem) {
    return poem;
  }
  return (
    <div>
      <div> testing </div>
      <div>{poem}</div>
      <button onClick={logTester}>getObj</button>
    </div>
  );
};

export default GetPoem;
