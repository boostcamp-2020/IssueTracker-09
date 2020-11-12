import React, { useState, useEffect } from 'react';
import LabelList from './LabelList';
import LabelMileNavForm from '../../components/LabelMileNavForm';
import { getLabelsAPI } from '../../apis/label';

const Labels = () => {
  const [labelList, setLabelList] = useState([]);

  const getLabels = async () => {
    const result = await getLabelsAPI();
    setLabelList(result);
  };

  useEffect(async () => {
    await getLabels();
  }, []);

  return (
    <>
      <LabelMileNavForm title="Label" getLabels={getLabels} />
      <LabelList labels={labelList} />
    </>
  );
};

export default Labels;
