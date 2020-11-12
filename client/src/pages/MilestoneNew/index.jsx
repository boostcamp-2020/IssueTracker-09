import React from 'react';
import { useHistory } from 'react-router-dom';
import MilestoneBox from '../../components/MilestoneBox';

import { Container, Header, H2 } from './styled';
import { createMilestoneAPI } from '../../apis/milestone'

const MilestoneNew = () => {
  const history = useHistory();
  const createHandler = async ({ title, content, deadline }) => {
    const result = await createMilestoneAPI(title, content, deadline);
    if(result){
      history.push('/milestones');
    }
  }

  return (
    <Container>
      <Header>
        <H2>New milestone</H2>
        <div>
          Create a new milestone to help organize your issues and pull requests.
          Learn more about milestones and issues.
        </div>
      </Header>
      <MilestoneBox type="create" createEvent={createHandler} />
    </Container>
  );
};

export default MilestoneNew;
