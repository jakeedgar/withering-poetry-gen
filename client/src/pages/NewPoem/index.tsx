import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '../../interfaces/interfaces';
import axios from 'axios';
import ErrorText from '../../components/ErrorText';
import Header from '../../components/Header';
import LoadingComponent from '../../components/LoadingComponent';
import Navigation from '../../components/Navigation';
import config from '../../config/config';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import SuccessText from '../../components/SuccessText';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Params } from 'react-router-dom';

const NewPoemPage: React.FunctionComponent<RouteComponentProps<Params>> = (props) => {
  const {} = props;

  const [_id, setId] = useState<string>('');
  const [creator, setCreator] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [contentPostErasure, setContentPostErasure] = useState<string>('');

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { user } = useContext(UserContext).userState;

  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let poemID = user.uid;

    if (poemID) {
      setId(poemID);
      getPoem(poemID);
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, []);

  const getPoem = async (id: string) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/poems/read/${id}`
      });

      if (response.status === (200 || 304)) {
        if (user._id !== response.data.poem.creator._id) {
          logging.warn(`This poem is owned by someone else.`);
          setId('');
        } else {
          setTitle(response.data.poem.title);
          setContent(response.data.poem.content);
          setCreator(response.data.poem.creator);

          /** Convert html string to draft JS */
          const contentBlock = htmlToDraft(response.data.poem.content);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);

          setEditorState(editorState);
        }
      } else {
        setError(`Unable to retrieve poem ${_id}`);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createPoem = async () => {
    if (title === '' || creator === '' || content === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }

    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.server.url}/create`,
        data: {
          title,
          creator: user._id,
          content,
          contentPostErasure
        }
      });

      if (response.status === 201) {
        setId(response.data.poem._id);
        setSuccess('Poem posted.  You can continue to edit on this page.');
      } else {
        setError(`Unable to save poem.`);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const editPoem = async () => {
    if (title === '' || creator === '' || content === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }

    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await axios({
        method: 'PATCH',
        url: `${config.server.url}/poems/update/${_id}`,
        data: {
          title,
          creator: user._id,
          content,
          contentPostErasure
        }
      });

      if (response.status === 201) {
        setSuccess('Poem updated.');
      } else {
        setError(`Unable to save poem.`);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <Container fluid className="p-0">
      <Navigation />
      <Header creator="" title={_id !== '' ? 'Edit Your Poem' : 'Create a Poem'} />
      <Container className="mt-5 mb-5">
        <ErrorText error={error} />
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              className="mr-2"
              type="text"
              name="title"
              value={title}
              id="title"
              placeholder="Enter a title"
              disabled={saving}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="creator">Author:</Label>
            <Input
              className="mr-2"
              type="text"
              name="creator"
              value={creator}
              id="creator"
              placeholder="Enter your name"
              disabled={saving}
              onChange={(event) => {
                setCreator(event.target.value);
              }}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label>Content</Label>
            <Input
              type="text"
              name="content"
              value={content}
              id="content"
              placeholder="Enter your content"
              disabled={saving}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </FormGroup> */}
          <FormGroup>
            <Label>Content</Label>
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              onEditorStateChange={(newState) => {
                setEditorState(newState);
                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
              }}
            />
          </FormGroup>
          <FormGroup>
            <SuccessText success={success} />
          </FormGroup>
          <FormGroup>
            <button
              className="btn-error text-base"
              onClick={() => {
                if (_id !== '') {
                  editPoem();
                } else {
                  createPoem();
                }
              }}
              disabled={saving}
            >
              {_id !== '' ? 'Update' : 'Post'}
            </button>
            {_id !== '' && (
              <button color="success">
                <a href={`/poems/${_id}`}>Go to your poem</a>
              </button>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Preview</Label>
            <div className="border ql-container p-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: content
                }}
              />
            </div>
          </FormGroup>
        </Form>
        <ErrorText error={error} />
      </Container>
    </Container>
  );
};

export default NewPoemPage;
