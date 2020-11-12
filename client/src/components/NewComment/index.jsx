/* eslint-disable react/jsx-curly-newline */
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
  Input,
  NewHeader,
  WriteDiv,
} from './styled';

const NewComment = ({ addEvent, updateStateEvent, isOpen, submitEvent }) => {
  const [inputValue, setInputvalue] = useState('');
  const [titleInputValue, setTitleInputvalue] = useState('');

  return (
    <WriteBox>
      {submitEvent ? (
        <>
          <NewHeader>
            <Square />
            <Input
              placeholder="Title"
              value={titleInputValue}
              onChange={(e) => setTitleInputvalue(e.target.value)}
            />
          </NewHeader>
          <Header>
            <WriteDiv>write</WriteDiv>
          </Header>
        </>
      ) : (
        <Header color="#d2e1f7">
          <WriteDiv>write</WriteDiv>
          <Square color="#d2e1f7" />
        </Header>
      )}
      <Textarea
        placeholder="Leave a comment"
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <ButtonContainer>
        {submitEvent ? (
          <Submit
            disabled={!titleInputValue}
            onClick={() =>
              submitEvent({ title: titleInputValue, comment: inputValue })
            }
          >
            submit
          </Submit>
        ) : (
          <>
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
          </>
        )}
      </ButtonContainer>
    </WriteBox>
  );
};

export default NewComment;
