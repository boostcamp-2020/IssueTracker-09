import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IssueHeader from '../../components/IssueHeader';
import IssueComment from '../../components/IssueComment';
import IssueSidebar from '../../components/IssueSidebar';
import { Container, Top, Bottom } from './styled';
import { getIssueByIdAPI } from '../../apis/issue';

const IssueDetail = () => {
  const [issue, setIssue] = useState(null);
  const param = useParams();

  useEffect(async () => {
    const result = await getIssueByIdAPI(param.id);
    setIssue(result);
  }, []);

  return (
    <Container>
      <Top>
        <IssueHeader />
      </Top>
      <Bottom>
        <IssueComment />
        <IssueSidebar issue={issue} />
      </Bottom>
    </Container>
  );
};

export default IssueDetail;
