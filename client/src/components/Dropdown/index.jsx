import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Details, Div, Summary } from './styled';
import { overlayElement } from '../Overlay';
import SelectMenu from '../SelectMenu';
import DropdownItem from '../DropdownItem';

const Dropdown = ({ title, action, changeState = null, serverData = null }) => {
  const [state, setState] = useState(null);
  const param = useParams();
  const location = useLocation();

  const clickHandler = async () => {
    if (!state) {
      const result = await action();
      setState(result);
    }
  };

  return (
    <Details onClick={clickHandler}>
      <Summary
        onClick={() => {
          overlayElement.current.hidden = false;
        }}
      >
        {title}
      </Summary>
      <Div position="absolute">
        {param.id || location.pathname === '/issues/new' ? (
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
