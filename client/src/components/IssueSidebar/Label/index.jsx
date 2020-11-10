import React, { useState } from 'react';
import { getLabelsAPI } from '../../../apis/label';
import Dropdown from '../../Dropdown';
import { Label, Span } from './styled';

const LabelContainer = ({ labels }) => {
  const [state, setState] = useState(labels || []);

  const changeState = (item) => {
    const index = state.findIndex((s) => s.id === item.id);
    if (index !== -1) {
      return setState(state.filter((s, i) => i !== index));
    }
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
