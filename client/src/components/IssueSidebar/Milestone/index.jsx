import React, { useState } from 'react';
import Dropdown from '../../Dropdown';
import { getMilestonesAPI } from '../../../apis/milestone';
import { Bar, Status, MileName, Span } from './styled';

const MilestoneContainer = ({ milestone }) => {
  const [state, setState] = useState(milestone);

  const changeState = (item) => {
    if (state.id === item.id) {
      return setState({});
    }
    return setState(item);
  };

  return (
    <>
      <Dropdown
        title="Milestone"
        action={getMilestonesAPI}
        changeState={changeState}
        serverData={[state]}
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
