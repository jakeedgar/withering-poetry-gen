import React from 'react';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';

export default function UpdatePoem(props) {
  const { poem } = props;

  const handleUpdatePoemFormSubmission = (event) => {
    event.preventDefault();
    props.onUpdatePoem({
      title: event.target.title.value,
      creator: event.target.creator.value,
      content: event.target.content.value,
      id: poem.id
    });
  };

  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleUpdatePoemFormSubmission} buttonText="Update poem" />
    </React.Fragment>
  );
}

UpdatePoem.propTypes = {
  poem: PropTypes.object,
  onUpdatePoem: PropTypes.func
};
