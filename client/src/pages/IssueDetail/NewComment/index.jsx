/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  Textarea,
  WriteBox,
  Header,
  Square,
  IsOpened,
  Submit,
  ButtonContainer,
} from './styled';

const NewComment = ({ addEvent, updateStateEvent, isOpen }) => {
  const [inputValue, setInputvalue] = useState('');

  return (
    <WriteBox>
      <Header>
        Write
        <Square />
      </Header>
      <Textarea
        placeholder="Leave a comment"
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <ButtonContainer>
        <IsOpened
          onClick={() => {
            updateStateEvent();
          }}
        >
          {isOpen ? 'close' : 'Reopen issue'}
        </IsOpened>
        <Submit
          onClick={() => {
            addEvent(inputValue);
            setInputvalue('');
          }}
          disabled={!inputValue}
        >
          Comment
        </Submit>
      </ButtonContainer>
    </WriteBox>
  );
};

export default NewComment;
