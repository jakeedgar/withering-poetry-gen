import React, { useEffect, useState } from 'react';
import ErrorText from '../../components/ErrorText';
import Header from '../../components/Header';
import LoadingComponent from '../../components/LoadingComponent';
import Navigation from '../../components/Navigation';
import logging from '../../config/logging';
import SuccessText from '../../components/SuccessText';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getFirestore } from '@firebase/firestore';
import app from '../../config/firebase';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Link, useNavigate, Navigate } from 'react-router-dom';

export interface IPoemProps {}

const NewPoemPage: React.FunctionComponent<IPoemProps> = (props) => {
  const db = getFirestore(app);
  const {} = props;

  const nav = useNavigate();

  const poemsCollectionRef = collection(db, 'poems');
  const [id, setId] = useState<string>('');
  const [poems, setPoems] = useState([]);
  const [creator, setCreator] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const logPoemId = async () => {
    const newPoemDocs = await getDocs(poemsCollectionRef);
    if (newPoemDocs) {
      try {
        newPoemDocs.docs.forEach((newPoemDoc) => {
          const poemInstance = newPoemDoc.data();
          console.log(poemInstance.title);
        });
      } catch (error) {
        logging.info(error);
        error;
      }
    }
  };

  const createPoem = async () => {
    await addDoc(poemsCollectionRef, { creator: creator, title: title, content: content });
    nav('/poems');
  };

  return (
    <div className="create">
      <Navigation />

      <div className="container-flex">
        <div className="row-flex">
          <div className="col-4-md">
            <div className="card">
              <div className="card-title">
                <div className="card-body">
                  <Input
                    type="textarea"
                    placeholder="Name..."
                    onChange={(event) => {
                      setCreator(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4-md">
            <div className="card">
              <div className="card-title">
                <div className="card-body">
                  <Input
                    type="textarea"
                    placeholder="Title..."
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4-md">
            <div className="card">
              <div className="card-title">
                <div className="card-body">
                  <Input
                    type="textarea"
                    placeholder="Content..."
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn-success ml-2 mt-3" onClick={createPoem}>
        Create!
      </button>
    </div>
  );
};

export default NewPoemPage;
