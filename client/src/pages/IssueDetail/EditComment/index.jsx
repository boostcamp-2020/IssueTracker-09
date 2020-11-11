/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Textarea, WriteBox } from './styled';

const EditComment = ({ comment, action, update }) => {
  const [inputValue, setInputvalue] = useState(comment);

  return (
    <WriteBox>
      <div>write</div>
      <Textarea
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <div>
        <button onClick={() => action(false)}>CANCEL</button>
        <button onClick={() => update(inputValue)} disabled={!inputValue}>
          Update comment
        </button>
      </div>
    </WriteBox>
  );
};

export default EditComment;
