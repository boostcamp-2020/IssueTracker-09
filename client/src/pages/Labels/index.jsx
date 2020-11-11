import React from 'react';
import LabelList from './LabelList';
import LabelMileNavForm from '../../components/LabelMileNavForm'

const Labels = () => {
  return (
    <>
      <LabelMileNavForm title="Label" />
      <LabelList />
    </>
  );
};

export default Labels;
