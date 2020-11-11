import React, { useState } from 'react';
import { faTag, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, LinkButtons, LinkName, NewButton, NewBox } from './styled';

const LabelMileNavForm = ({ title }) => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  return (
    <>
      <Container>
        <LinkButtons>
          <LinkName>
            <Link to="/labels">
              <FontAwesomeIcon icon={faTag} />
              Labels
            </Link>
          </LinkName>
          <LinkName>
            <Link to="/milestones">
              <FontAwesomeIcon icon={faFlag} />
              Milestones
            </Link>
          </LinkName>
        </LinkButtons>
        {title === 'Label' ? (
          <NewButton onClick={handleClick}>New {title}</NewButton>
        ) : (
          <Link to="/milestone/new">
            <NewButton>New {title}</NewButton>
          </Link>
        )}
      </Container>
      {state ? <NewBox>test</NewBox> : ''}
    </>
  );
};

export default LabelMileNavForm;
