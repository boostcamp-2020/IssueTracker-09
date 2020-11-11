import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IssueContext } from '../../../stores/issueStore';
import { Container, CloseMark, FlexDiv } from './styled';

const ResetFilter = () => {
  const {
    issueState: { search },
  } = useContext(IssueContext);

  return (
    <Container>
      {search !== 'is:open' ? (
        <Link to="?q=is:open">
          <FlexDiv>
            <CloseMark>X</CloseMark>Clear current search query, filters
          </FlexDiv>
        </Link>
      ) : (
        ''
      )}
    </Container>
  );
};

export default ResetFilter;
