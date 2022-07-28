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
    <div className="p-1 ml-1">
      <ReusableForm formSubmissionHandler={handleNewPoemFormSubmission} buttonText="Redactify!" />
    </div>
  );
}

NewPoemForm.propTypes = {
  onNewPoemCreation: PropTypes.func
};

export default NewPoemForm;
