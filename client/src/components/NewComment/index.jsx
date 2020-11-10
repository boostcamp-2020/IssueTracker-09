/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Textarea, WriteBox } from './styled';

const NewComment = ({ addEvent }) => {
  const [inputValue, setInputvalue] = useState('');
  return (
    <WriteBox>
      <div>write</div>
      <Textarea
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <div>
        <button>close issue</button>
        <button
          onClick={() => {
            addEvent(inputValue);
            setInputvalue('');
          }}
        >
          Comment
        </button>
      </div>
    </WriteBox>
  );
};

export default NewComment;
