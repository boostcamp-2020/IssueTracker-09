import React, { useState, useContext } from 'react';
import { getLabelsAPI } from '../../../apis/label';
import Dropdown from '../../Dropdown';
import { Label, Span } from './styled';
import { updateLabelAPI } from '../../../apis/issue';
import { CreateInfoContext } from '../../../stores/createInfoStore';

const LabelContainer = ({ labels, issueId, type }) => {
  const [state, setState] = useState(labels || []);
  const { changeInfo } = useContext(CreateInfoContext);

  const changeState = async (item) => {
    const index = state.findIndex((s) => s.id === item.id);
    if (index !== -1) {
      if (type === 'modify') {
        await updateLabelAPI(issueId, state[index].id, false);
      }
      changeInfo(
        'label',
        state.filter((s, i) => i !== index)
      );
      return setState(state.filter((s, i) => i !== index));
    }
    if (type === 'modify') {
      await updateLabelAPI(issueId, item.id, true);
    }
    changeInfo('label', [...state, item]);
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
