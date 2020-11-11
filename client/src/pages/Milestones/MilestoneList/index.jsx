/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Container } from './styled';
import MilestoneListHeader from '../MilestoneListHeader';
import MilestoneItem from '../MilestoneItem';
import {
  getMilestonesAPI,
  updateMilestoneStateAPI,
  removeMilestoneAPI,
} from '../../../apis/milestone';

const MilestoneList = () => {
  const [milestoneList, setMilestoneList] = useState([]);
  const [state, setState] = useState(true);

  useEffect(async () => {
    const result = await getMilestonesAPI();
    setMilestoneList(result);
  }, []);

  const updateStateHandler = async (id, newState) => {
    const result = await updateMilestoneStateAPI(id, newState);
    if (result) {
      const newList = milestoneList.map((item) => {
        if (item.id === id) {
          item.is_opened = newState;
        }
        return item;
      });
      setMilestoneList(newList);
    }
  };

  const deleteHandler = async (id) => {
    const result = await removeMilestoneAPI(id);
    if (result) {
      const newList = milestoneList.filter((item) => item.id !== id);
      setMilestoneList(newList);
    }
  };

  return (
    <Container>
      <MilestoneListHeader
        action={setState}
        list={milestoneList}
        state={state}
      />
      {milestoneList?.map((item, index) => (
        <MilestoneItem
          milestone={item}
          key={index}
          state={state}
          updateEvent={updateStateHandler}
          deleteEvent={deleteHandler}
        />
      ))}
    </Container>
  );
};

export default MilestoneList;
