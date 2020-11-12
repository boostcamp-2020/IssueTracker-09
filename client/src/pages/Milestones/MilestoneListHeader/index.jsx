import React from 'react';
import { faCheck, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Div, Container } from './styled';

const MilestoneListHeader = ({ action, list, state }) => {
  const close = list.filter((item) => item.is_opened === false);

  return (
    <Container>
      <Div margin="0 10px 0 0" onClick={() => action(true)}>
        <FontAwesomeIcon icon={faFlag} />
        <Div margin="0 0 0 7px" state={state === true}>
          {list.length - close.length} OPEN
        </Div>
      </Div>
      <Div onClick={() => action(false)}>
        <FontAwesomeIcon icon={faCheck} size="1x" color="gray" />
        <Div margin="0 0 0 7px" state={state === false}>
          {close.length} CLOSE
        </Div>
      </Div>
    </Container>
  );
};

export default MilestoneListHeader;
