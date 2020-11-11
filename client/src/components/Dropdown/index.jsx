import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Details, Div, Summary } from './styled';

import SelectMenu from '../SelectMenu';
import DropdownItem from '../DropdownItem';

const Dropdown = ({ title, action, changeState = null, serverData = null }) => {
  const [state, setState] = useState(null);
  const param = useParams();

  const clickHandler = async () => {
    if (!state) {
      const result = await action();
      setState(result);
    }
  };

  const overlay = document.getElementById('overlay');

  return (
    <Details onClick={clickHandler}>
      <Summary
        onClick={() => {
          overlay.hidden = false;
        }}
      >
        {title}
      </Summary>
      <Div position="absolute">
        {param.id ? (
          <DropdownItem
            title={title}
            data={state}
            changeState={changeState}
            serverData={serverData}
          />
        ) : (
          <SelectMenu title={title} data={state} />
        )}
      </Div>
    </Details>
  );
};

export default Dropdown;
