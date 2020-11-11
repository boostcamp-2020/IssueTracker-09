import React, { useState } from 'react';
import { faTag, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, LinkButtons, LinkName, NewButton, NewBox } from './styled';
import EditLabel from '../EditLabel';
import { createLabelAPI } from '../../apis/label';

const LabelMileNavForm = ({ title, getLabels }) => {
  const [state, setState] = useState(false);

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
        <NewButton onClick={handleClick}>New {title}</NewButton>
      </Container>
      {state ? (
        <NewBox>
          <EditLabel
            label={{ title: '', color: '' }}
            type="create"
            createEvent={createHandler}
          />
        </NewBox>
      ) : (
        ''
      )}
    </>
  );
};

export default LabelMileNavForm;
