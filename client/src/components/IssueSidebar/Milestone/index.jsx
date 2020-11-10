import React, { useState } from 'react';
import Dropdown from '../../Dropdown';
import { getMilestonesAPI } from '../../../apis/milestone';
import { Bar, Status, MileName, Span } from './styled';
import { updateMilestoneAPI } from '../../../apis/issue';

const MilestoneContainer = ({ milestone, issueId }) => {
  const [state, setState] = useState(milestone);

  const changeState = async (item) => {
    if (state?.id !== item.id) {
      await updateMilestoneAPI(issueId, item.id);
      return setState(item);
    }
    return null;
  };

  return (
    <>
      <Dropdown
        title="Milestone"
        action={getMilestonesAPI}
        changeState={changeState}
        serverData={state ? [state] : []}
      />
      {state?.id ? (
        <>
          <Bar>
            <Status percentage={(state.openCount / state.totalCount) * 100} />
          </Bar>
          <MileName>{state.title}</MileName>
        </>
      ) : (
        <Span>No Milestone</Span>
      )}
    </>
  );
};

export default MilestoneContainer;
