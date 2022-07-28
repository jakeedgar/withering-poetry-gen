import React from 'react';
import Poem from './Poem';
import { RedactPoem } from './RedactPoem';
import PropTypes from 'prop-types';

export default function PoemList(props) {
  return (
    <React.Fragment>
      {props.poemList.map((poem) => (
        <Poem whenPoemClicked={props.onPoemSelection} id={poem.id} key={poem.id} title={poem.title} creator={poem.creator} content={poem.content} />
      ))}
    </React.Fragment>
  );
}

PoemList.propTypes = {
  poemList: PropTypes.array,
  onPoemSelection: PropTypes.func
};
