import React from 'react';
import IssueHeader from '../../components/IssueHeader';
import IssueComment from '../../components/IssueComment';
import IssueSidebar from '../../components/IssueSidebar';
import { Container, Top, Bottom } from './styled';

const IssueDetail = () => {
  return (
    <Container>
      <Top>
        <IssueHeader />
      </Top>
      <Bottom>
        <IssueComment />
        <IssueSidebar />
      </Bottom>
    </Container>
  );
};

export default IssueDetail;
