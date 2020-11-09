/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Details, Div } from './styled';

import SelectMenu from '../SelectMenu';

const Dropdown = ({ title, action }) => {
  const [state, setState] = useState(null);

  const clickHandler = async () => {
    if (!state) {
      const result = await action();
      setState(result);
    }
  };

  return (
    <Details onClick={clickHandler}>
      <summary>{title}</summary>
      <Div position="absolute">
        <SelectMenu title={title} data={state} />
      </Div>
    </Details>
  );
};

export default Dropdown;
