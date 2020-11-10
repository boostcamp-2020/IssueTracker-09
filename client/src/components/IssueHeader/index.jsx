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

const IssueHeader = ({ issue: { title, is_opened } }) => {
  const [inputValue, setInputValue] = useState(title || '');
  const [state, setState] = useState(false);
  const [issueTitle, setIssueTitle] = useState(title || '');
  const saveTitleHandler = () => {
    // API 호출부?
    if (true) {
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
        <Div padding="5px">joojaewoo created this issue</Div>
      </FlexDiv>
    </Container>
  );
};

export default IssueHeader;
