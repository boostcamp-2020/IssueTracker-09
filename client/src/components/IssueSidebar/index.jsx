import React from 'react';
import { Container, DropdownContainer } from './styled';
import AssigneeContainer from './Assignee';
import LabelContainer from './Label';
import MilestoneContainer from './Milestone';

const issue = {
  Assignees: [
    {
      id: 1,
      user_code: 'g46195613',
      name: 'namee',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      id: 2,
      user_code: 'g46195613',
      name: 'namee2',
      image: '',
    },
  ],
  Milestone: {
    id: 1,
    title: 'asdf',
    content: '수정 테스트',
    deadline: '2020-11-05',
    openCount: 10,
    totalCount: 100,
    is_opened: true,
  },
  Labels: [
    {
      id: 1,
      color: 'red',
      title: 'asdf',
      content: '입력 테스트',
    },
    {
      id: 2,
      color: 'green',
      title: 'asdf',
      content: '입력 테스트',
    },
  ],
};

const IssueSidebar = () => {
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
