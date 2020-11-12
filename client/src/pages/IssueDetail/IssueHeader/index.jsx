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
  Button,
  Id,
  Text,
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
        <Div width="100%">
          {state ? (
            <InputBox
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <>
              <Span>{inputValue}</Span>
              <Id>#{id}</Id>
            </>
          )}
        </Div>
        <Div>
          {state ? (
            <>
              <Button onClick={cancelTitleHandler}>CANCEL</Button>
              <Button onClick={saveTitleHandler}>SAVE</Button>
            </>
          ) : (
            <Button
              onClick={() => {
                setState(true);
              }}
            >
              Edit
            </Button>
          )}
        </Div>
      </FlexDiv>
      <FlexDiv>
        <IconBackground isOpen={is_opened}>
          <Icon>!</Icon>
          {is_opened ? 'open' : 'close'}
        </IconBackground>
        <Text>{User?.name} created this issue</Text>
      </FlexDiv>
    </Container>
  );
};

export default IssueHeader;
