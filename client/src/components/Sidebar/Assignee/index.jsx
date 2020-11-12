import React, { useState, useContext } from 'react';
import Dropdown from '../../Dropdown';
import { getUsersAPI } from '../../../apis/user';
import { Item, Image, DummyImage, Name, Span } from './styled';
import { updateAssigneeAPI } from '../../../apis/issue';
import { CreateInfoContext } from '../../../stores/createInfoStore';

const AssigneeContainer = ({ assignees, issueId, type }) => {
  const [state, setState] = useState(assignees || []);
  const { changeInfo } = useContext(CreateInfoContext);

  const changeState = async (item) => {
    const index = state.findIndex((s) => s.id === item.id);
    if (index !== -1) {
      if (type === 'modify') {
        await updateAssigneeAPI(issueId, state[index].id, false);
      }
      changeInfo(
        'assignee',
        state.filter((s, i) => i !== index)
      );
      return setState(state.filter((s, i) => i !== index));
    }
    if (type === 'modify') {
      await updateAssigneeAPI(issueId, item.id, true);
    }
    changeInfo('assignee', [...state, item]);
    return setState([...state, item]);
  };

  return (
    <>
      <Dropdown
        title="Assignee"
        action={getUsersAPI}
        changeState={changeState}
        serverData={state}
      />
      {state.length ? (
        state.map((item, index) => (
          <Item key={`assignee${index}`}>
            {item.image === '' ? (
              <>
                <DummyImage />
                <Name>{item.name}</Name>
              </>
            ) : item.image ? (
              <>
                <Image image={item.image} />
                <Name>{item.name}</Name>
              </>
            ) : (
              ''
            )}
          </Item>
        ))
      ) : (
        <Span>No one-assign yourself</Span>
      )}
    </>
  );
};

export default AssigneeContainer;
