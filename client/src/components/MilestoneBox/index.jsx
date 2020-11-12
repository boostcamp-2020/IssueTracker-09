/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/button-has-type */
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  ContentsBox,
  Title,
  TitleInput,
  DescriptionInput,
  ButtonBox,
  Button,
} from './styled';

const MilestoneBox = ({
  createEvent,
  updateStateEvent,
  updateEvent,
  milestone = {},
  type = undefined,
}) => {
  const history = useHistory();

  const titleValue = useRef(null);
  const dateValue = useRef(null);
  const descValue = useRef(null);

  const changeState = milestone.is_opened ? 'Close' : 'Open';

  return (
    <Container>
      <ContentsBox>
        <Title>Title</Title>
        <TitleInput
          placeholder="Title"
          type="text"
          defaultValue={milestone.title || ''}
          ref={titleValue}
        />
      </ContentsBox>
      <ContentsBox>
        <Title>Due date (optional)</Title>
        <TitleInput
          type="date"
          defaultValue={milestone.deadline || ''}
          ref={dateValue}
        />
      </ContentsBox>
      <ContentsBox>
        <Title>Description</Title>
        <DescriptionInput
          defaultValue={milestone.content || ''}
          ref={descValue}
        />
      </ContentsBox>
      <ButtonBox>
        {type === 'create' ? (
          <Button
            backgroundColor="#2ea44f"
            onClick={() =>
              createEvent({
                title: titleValue.current.value,
                content: descValue.current.value,
                deadline: dateValue.current.value,
              })
            }
          >
            Create milestone
          </Button>
        ) : (
          <>
            <Button
              backgroundColor="#fafbfc"
              color="black"
              onClick={() => history.push('/milestones')}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="#fafbfc"
              color="black"
              onClick={() => {
                updateStateEvent(!milestone.is_opened);
              }}
            >
              {changeState} Milestone
            </Button>
            <Button
              backgroundColor="#2ea44f"
              onClick={() => {
                updateEvent({
                  title: titleValue.current.value,
                  content: descValue.current.value,
                  deadline: dateValue.current.value,
                });
              }}
            >
              Save changes
            </Button>
          </>
        )}
      </ButtonBox>
    </Container>
  );
};

export default MilestoneBox;
