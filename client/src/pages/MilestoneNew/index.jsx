import React from 'react';
import MilestoneBox from '../../components/MilestoneBox';

import { Container, Header, H2 } from './styled';

const MilestoneNew = () => {
  return (
    <Container>
      <Header>
        <H2>New milestone</H2>
        <div>
          Create a new milestone to help organize your issues and pull requests.
          Learn more about milestones and issues.
        </div>
      </Header>
      <MilestoneBox />
    </Container>
  );
};

export default MilestoneNew;
