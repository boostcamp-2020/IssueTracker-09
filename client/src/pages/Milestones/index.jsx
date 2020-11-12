import React from 'react';
import LabelMileNavForm from '../../components/LabelMileNavForm';
import MilestoneList from './MilestoneList';

const Milestones = () => {
  return (
    <>
      <LabelMileNavForm title="Milestone" />
      <MilestoneList />
    </>
  );
};

export default Milestones;
