/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  Container,
  ContentsBox,
  Title,
  TitleInput,
  DescriptionInput,
  ButtonBox,
  Button,
} from './styled';

const MilestoneBox = ({ createEvent, type = null }) => {
  const [titleValue, settitleValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [descValue, setdescValue] = useState(null);

  return (
    <Container>
      <ContentsBox>
        <Title>Title</Title>
        <TitleInput
          placeholder="Title"
          type="input"
          onChange={(e) => settitleValue(e.target.value)}
        />
      </ContentsBox>
      <ContentsBox>
        <Title>Due date (optional)</Title>
        <TitleInput
          type="date"
          onChange={(e) => setDateValue(e.target.value)}
        />
      </ContentsBox>
      <ContentsBox>
        <Title>Description</Title>
        <DescriptionInput onChange={(e) => setdescValue(e.target.value)} />
      </ContentsBox>
      <ButtonBox>
        {type === 'create' ? (
          <Button
            onClick={() =>
              createEvent({
                title: titleValue,
                content: descValue,
                deadline: dateValue,
              })
            }
          >
            Create milestone
          </Button>
        ) : (
          console.log()
        )}
      </ButtonBox>
    </Container>
  );
};

export default MilestoneBox;
