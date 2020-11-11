import React from 'react';
import LabelItem from '../LabelItem';
import { Container, Header } from './styled';

const LabelList = ({ labels = [] }) => {
  return (
    <Container>
      <Header>{labels.length} labels</Header>
      {labels?.map((item, index) => (
        <LabelItem key={index} label={item} />
      ))}
    </Container>
  );
};

export default LabelList;
