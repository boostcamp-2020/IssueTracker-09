import React, { useState } from 'react';
import { faTag, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, LinkButtons, LinkName, NewButton, NewBox } from './styled';
import EditLabel from '../EditLabel';
import { createLabelAPI } from '../../apis/label';

const LabelMileNavForm = ({ title, getLabels }) => {
  const [state, setState] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setState(!state);
  };

  const createHandler = async (data) => {
    const result = await createLabelAPI(data);
    if (result) {
      await getLabels();
      handleClick();
    }
  };

  return (
    <>
      <Container>
        <LinkButtons>
          <LinkName path={location.pathname === '/labels'}>
            <Link to="/labels">
              <FontAwesomeIcon icon={faTag} />
              Labels
            </Link>
          </LinkName>
          <LinkName path={location.pathname === '/milestones'}>
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
      {state ? (
        <NewBox>
          <EditLabel
            label={{ title: '', color: '' }}
            type="create"
            createEvent={createHandler}
            action={handleClick}
          />
        </NewBox>
      ) : (
        ''
      )}
    </>
  );
};

export default LabelMileNavForm;
