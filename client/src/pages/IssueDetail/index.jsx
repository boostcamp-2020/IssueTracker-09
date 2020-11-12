import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IssueHeader from './IssueHeader';
import IssueComment from './IssueComment';
import IssueSidebar from '../../components/Sidebar';
import { Container, Top, Bottom } from './styled';
import { getIssueByIdAPI } from '../../apis/issue';

const IssueDetail = () => {
  const [issue, setIssue] = useState({});
  const param = useParams();

  const getIssue = async () => {
    const result = await getIssueByIdAPI(param.id);
    setIssue(result);
  };

  useEffect(async () => {
    await getIssue();
  }, []);

  return (
    <Container>
      <Top>
        <IssueHeader issue={issue} id={param.id} />
      </Top>
      <Bottom>
        <IssueComment
          id={param.id}
          getIssue={getIssue}
          isOpen={issue?.is_opened}
        />
        <IssueSidebar issue={issue} type="modify" />
      </Bottom>
    </Container>
  );
};

export default IssueDetail;
