import React, { useState } from 'react';
import Dropdown from '../../Dropdown';
import { getUsersAPI } from '../../../apis/user';
import { Item, Image, DummyImage, Name, Span } from './styled';
import { updateAssigneeAPI } from '../../../apis/issue';

const AssigneeContainer = ({ assignees, issueId }) => {
  const [state, setState] = useState(assignees || []);

  const changeState = async (item) => {
    const index = state.findIndex((s) => s.id === item.id);
    if (index !== -1) {
      await updateAssigneeAPI(issueId, state[index].id, false);
      return setState(state.filter((s, i) => i !== index));
    }
    await updateAssigneeAPI(issueId, item.id, true);
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
