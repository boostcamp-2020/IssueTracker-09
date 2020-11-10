/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Details, Div } from './styled';

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
      <summary
        onClick={() => {
          overlay.hidden = false;
        }}
      >
        {title}
      </summary>
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
