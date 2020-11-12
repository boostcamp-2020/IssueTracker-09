/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faFlag } from '@fortawesome/free-solid-svg-icons';

import MilestoneBox from '../../components/MilestoneBox';
import { Container, LinkButtons, LinkName } from './styled';
import {
  createMilestoneAPI,
  getMilestonesByIdAPI,
  updateMilestoneAPI,
  updateMilestoneStateAPI,
} from '../../apis/milestone';

const MilestoneEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();

  const [milestone, setMilestone] = useState({});

  useEffect(async () => {
    const result = await getMilestonesByIdAPI(id);
    setMilestone(result);
  }, []);

  const createHandler = async ({ title, content, deadline }) => {
    const result = await createMilestoneAPI(title, content, deadline);
    if (result) {
      history.push('/milestones');
    }
  };

  const updateStateHandler = async (isOpened) => {
    const result = await updateMilestoneStateAPI(id, isOpened);
    if (result) {
      history.push('/milestones');
    }
  };

  const updateHandler = async ({ title, deadline, content }) => {
    const result = await updateMilestoneAPI(id, title, deadline, content);
    if (result) {
      history.push('/milestones');
    }
  };

  return (
    <Container>
      <LinkButtons>
        <LinkName path={location.pathname === '/labels'}>
          <Link to="/labels">
            <FontAwesomeIcon icon={faTag} />
            Labels
          </Link>
        </LinkName>
        <LinkName path={location.pathname.includes('/milestone')}>
          <Link to>
            <FontAwesomeIcon icon={faFlag} />
            Milestones
          </Link>
        </LinkName>
      </LinkButtons>
      <MilestoneBox
        type="edit"
        milestone={milestone}
        updateStateEvent={updateStateHandler}
        updateEvent={updateHandler}
        createEvent={createHandler}
      />
    </Container>
  );
};

export default MilestoneEdit;
