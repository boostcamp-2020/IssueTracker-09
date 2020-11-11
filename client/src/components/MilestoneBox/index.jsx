import React from 'react';
import {
  Container,
  ContentsBox,
  Title,
  TitleInput,
  DescriptionInput,
} from './styled';

const MilestoneBox = () => {
  return (
    <Container>
      <ContentsBox>
        <Title>Title</Title>
        <TitleInput placeholder="Title" type="input" />
      </ContentsBox>
      <ContentsBox>
        <Title>Due date (optional)</Title>
        <TitleInput type="date" />
      </ContentsBox>
      <ContentsBox>
        <Title>Description</Title>
        <DescriptionInput />
      </ContentsBox>
    </Container>
  );
};

export default MilestoneBox;
