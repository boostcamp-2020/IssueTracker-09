import React, { useEffect, useState } from 'react';
import LabelItem from '../LabelItem';
import { getLabelsAPI } from '../../../apis/label';
import { Container, Header } from './styled';

const LabelList = () => {
  const [labelList, setLabelList] = useState([]);

  useEffect(async () => {
    const result = await getLabelsAPI();
    setLabelList(result);
  }, []);

  return (
    <Container>
      <Header>{labelList.length} labels</Header>
      {labelList?.map((item, index) => (
        <LabelItem key={index} label={item} />
      ))}
    </Container>
  );
};

export default LabelList;
