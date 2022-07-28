import React from 'react';
import PropTypes from 'prop-types';
import { RedactAll } from './RedactPoem';

const Poem = (props) => {
  const redactedContent = RedactAll(props.content);
  console.log(props);
  return (
    <div onClick={() => props.whenPoemClicked(props.id)}>
      <div class="row-flex gap-1 justify-center">
        <div class="col-12-xs col-7-sm col-5-xl">
          <div className="letter-body">
            <div className="letter">
              <div className="letter-header">
                {props.title} - {props.creator}
              </div>
              <p dangerouslySetInnerHTML={{ __html: redactedContent }}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Poem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  creator: PropTypes.string,
  content: PropTypes.string,
  whenPoemClicked: PropTypes.func
};

export default Poem;
