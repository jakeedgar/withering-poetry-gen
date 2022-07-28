import React from 'react';
import PropTypes from 'prop-types';
import { RedactPoem } from './RedactPoem';
import '../../index.css';

export const PoemDetail = (props) => {
  const { poem, onClickingDelete, onClickingEdit } = props;

  const redactedContent = RedactPoem(poem.content);

  const htmlContent = '';

  return (
    <div className="container-flex">
      <div className="letter-body">
        <div className="letter">
          <div className="letter-header">{poem.title}</div>
          By: {poem.creator}
          <br />
          <hr />
          <br />
          <div dangerouslySetInnerHTML={{ __html: redactedContent }}></div>
        </div>
      </div>

      <button className="btn-primary text-dark mt-1 mb-1" onClick={() => onClickingEdit(poem.id)}>
        Update Poem
      </button>
      <br />
      <button className="btn-error text-base mt-1 mb-1" onClick={() => onClickingDelete(poem.id)}>
        Delete Poem
      </button>
      <br />
    </div>
  );
};

PoemDetail.propTypes = {
  poem: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PoemDetail;
