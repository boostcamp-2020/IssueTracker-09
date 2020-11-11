/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  Container,
  FlexDiv,
  InputBox,
  Div,
  Span,
  Icon,
  IconBackground,
} from './styled';
import { updateTitleAPI } from '../../../apis/issue';

const IssueHeader = ({ id, issue: { title, is_opened, User } }) => {
  if (!title) {
    return null;
  }

  const [inputValue, setInputValue] = useState(title || '');
  const [issueTitle, setIssueTitle] = useState(title || '');
  const [state, setState] = useState(false);

  const saveTitleHandler = async () => {
    const result = await updateTitleAPI(id, inputValue);
    if (result) {
      setIssueTitle(inputValue);
    }
    setState(false);
  };

  const cancelTitleHandler = () => {
    setInputValue(issueTitle);
    setState(false);
  };

  return (
    <Container>
      <FlexDiv align="space-between">
        <Div width="80%">
          {state ? (
            <InputBox
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <Span>{inputValue}</Span>
          )}
        </Div>
        <Div>
          {state ? (
            <>
              <button onClick={cancelTitleHandler}>CANCEL</button>
              <button onClick={saveTitleHandler}>SAVE</button>
            </>
          ) : (
            <button
              onClick={() => {
                setState(true);
              }}
            >
              edit
            </button>
          )}
        </Div>
      </FlexDiv>
      <FlexDiv>
        <IconBackground isOpen={is_opened}>
          <Icon>!</Icon>
          {is_opened ? 'open' : 'close'}
        </IconBackground>
        <Div padding="5px">{User?.name} created this issue</Div>
      </FlexDiv>
    </Container>
  );
};

export default IssueHeader;
