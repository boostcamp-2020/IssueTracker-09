import React from 'react';
import { Container, DropdownContainer } from './styled';
import AssigneeContainer from './Assignee';
import LabelContainer from './Label';
import MilestoneContainer from './Milestone';

const IssueSidebar = ({ issue }) => {
  if (!issue) {
    return null;
  }

  return (
    <Container>
      <DropdownContainer>
        <AssigneeContainer assignees={issue.Assignees} />
      </DropdownContainer>
      <DropdownContainer>
        <LabelContainer labels={issue.Labels} />
      </DropdownContainer>
      <DropdownContainer>
        <MilestoneContainer milestone={issue.Milestone} />
      </DropdownContainer>
    </Container>
  );
};

export default IssueSidebar;
