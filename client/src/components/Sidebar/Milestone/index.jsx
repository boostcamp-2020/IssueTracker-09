/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react';
import Dropdown from '../../Dropdown';
import { getMilestonesAPI } from '../../../apis/milestone';
import { Bar, Status, MileName, Span, Delete } from './styled';
import { updateMilestoneAPI } from '../../../apis/issue';
import { CreateInfoContext } from '../../../stores/createInfoStore';

const MilestoneContainer = ({ milestone, issueId, type }) => {
  const [state, setState] = useState(milestone || {});
  const { changeInfo } = useContext(CreateInfoContext);

  const changeState = async (item) => {
    if (state.id !== item.id) {
      if (type === 'modify') {
        await updateMilestoneAPI(issueId, item.id);
      }
      changeInfo('milestone', item);
      return setState(item);
    }
    changeInfo('milestone', null);
    return null;
  };

  const deleteHandler = async () => {
    if (type === 'modify') {
      await updateMilestoneAPI(issueId, null);
    }
    changeInfo('milestone', null);
    return setState({});
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
          <Delete onClick={deleteHandler}>X Clear this milestone</Delete>
          <Bar>
            <Status
              percentage={
                (1 - Math.ceil(state.openCount / state.totalCount)) * 100
              }
            />
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
