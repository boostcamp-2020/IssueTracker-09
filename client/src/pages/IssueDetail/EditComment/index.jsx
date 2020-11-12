/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  Textarea,
  WriteBox,
  Cancel,
  Submit,
  ButtonContainer,
  Header,
  Square,
} from './styled';

const EditComment = ({ comment, action, update }) => {
  const [inputValue, setInputvalue] = useState(comment);

  return (
    <WriteBox>
      <Header>
        Write
        <Square />
      </Header>
      <Textarea
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <ButtonContainer>
        <Cancel onClick={() => action(false)}>CANCEL</Cancel>
        <Submit onClick={() => update(inputValue)} disabled={!inputValue}>
          Update comment
        </Submit>
      </ButtonContainer>
    </WriteBox>
  );
};

export default EditComment;
