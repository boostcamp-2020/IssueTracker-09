/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Textarea, WriteBox } from './styled';

const NewComment = ({ addEvent, updateStateEvent, isOpen }) => {
  const [inputValue, setInputvalue] = useState('');
  return (
    <WriteBox>
      <div>write</div>
      <Textarea
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <div>
        <button
          onClick={() => {
            updateStateEvent();
          }}
        >
          {isOpen ? 'close' : 'Reopen issue'}
        </button>
        <button
          onClick={() => {
            addEvent(inputValue);
            setInputvalue('');
          }}
          disabled={!inputValue}
        >
          Comment
        </button>
      </div>
    </WriteBox>
  );
};

export default NewComment;
