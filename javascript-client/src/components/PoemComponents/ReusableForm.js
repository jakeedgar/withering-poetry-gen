import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
  return (
    <React.Fragment>
      <div className="container-flex">
        <form onSubmit={props.formSubmissionHandler}>
          <textarea id="text-area" className="input-text" type="text" name="creator" placeholder="Your Name ..." />
          <br />
          <textarea id="text-area" className="input-text" type="text" name="title" placeholder="Poem Title ..." />
          <br />
          <textarea id="text-area-para" className="input-text" type="text" maxLength={225} name="content" placeholder="Random Paragraph here ..." />
          <br />
          <button className="btn-success" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;
