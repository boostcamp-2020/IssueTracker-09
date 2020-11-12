import React from 'react';
import { Container, DropdownContainer } from './styled';
import AssigneeContainer from './Assignee';
import LabelContainer from './Label';
import MilestoneContainer from './Milestone';

const IssueSidebar = ({ issue = { id: 1000 }, type }) => {
  if (!issue.id) {
    return null;
  }

  console.log('!!');
  return (
    <Container>
      <DropdownContainer>
        <AssigneeContainer
          assignees={issue.Assignees}
          issueId={issue.id}
          type={type}
        />
      </DropdownContainer>
      <DropdownContainer>
        <LabelContainer labels={issue.Labels} issueId={issue.id} type={type} />
      </DropdownContainer>
      <DropdownContainer>
        <MilestoneContainer
          milestone={issue.Milestone}
          issueId={issue.id}
          type={type}
        />
      </DropdownContainer>
    </Container>
  );
};

export default IssueSidebar;
