/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/button-has-type */
import React, { useRef } from 'react';
import {
  Container,
  ContentsBox,
  Title,
  TitleInput,
  DescriptionInput,
  ButtonBox,
  Button,
} from './styled';

const MilestoneBox = ({ createEvent, milestone = {}, type = undefined }) => {
  const titleValue = useRef(null);
  const dateValue = useRef(null);
  const descValue = useRef(null);

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
          defaultValue={milestone.date || ''}
          ref={dateValue}
        />
      </ContentsBox>
      <ContentsBox>
        <Title>Description</Title>
        <DescriptionInput defaultValue={milestone.desc || ''} ref={descValue} />
      </ContentsBox>
      <ButtonBox>
        {type === 'create' ? (
          <Button
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
          ''
        )}
      </ButtonBox>
    </Container>
  );
};

export default MilestoneBox;
