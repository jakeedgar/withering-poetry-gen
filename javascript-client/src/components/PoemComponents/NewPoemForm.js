import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';

function NewPoemForm(props) {
  function handleNewPoemFormSubmission(event) {
    event.preventDefault();
    props.onNewPoemCreation({
      id: v4(),
      title: event.target.title.value,
      creator: event.target.creator.value,
      content: event.target.content.value
    });
  }
  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleNewPoemFormSubmission} buttonText="New poem!" />
    </React.Fragment>
  );
}

NewPoemForm.propTypes = {
  onNewPoemCreation: PropTypes.func
};

export default NewPoemForm;
