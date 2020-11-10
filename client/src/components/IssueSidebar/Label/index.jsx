import React, { useState } from 'react';
import { getLabelsAPI } from '../../../apis/label';
import Dropdown from '../../Dropdown';
import { Label, Span } from './styled';
import { updateLabelAPI } from '../../../apis/issue';

const LabelContainer = ({ labels, issueId }) => {
  const [state, setState] = useState(labels || []);

  const changeState = async (item) => {
    const index = state.findIndex((s) => s.id === item.id);
    if (index !== -1) {
      await updateLabelAPI(issueId, state[index].id, false);
      return setState(state.filter((s, i) => i !== index));
    }
    await updateLabelAPI(issueId, item.id, true);
    return setState([...state, item]);
  };

  return (
    <>
      <Dropdown
        title="Label"
        action={getLabelsAPI}
        changeState={changeState}
        serverData={state}
      />
      {state.length ? (
        state.map((item, index) => (
          <Label key={`label${index}`} color={item.color}>
            {item.title}
          </Label>
        ))
      ) : (
        <Span>None yet</Span>
      )}
    </>
  );
};

export default LabelContainer;
