/* eslint-disable react/self-closing-comp */

import React from 'react';
import { Div, Details } from './styled';
import SelectMenu from '../SelectMenu';

const ListHeader = () => {
  return (
    <Div width="60%" margin="0 auto" border="1px solid lightGray">
      <Div padding="10px">
        <input type="checkbox"></input>
      </Div>
      <Div width="100%">
        <Div padding="10px"> close/open</Div>
        <Div width="100%" align="flex-end">
          <Details>
            <summary>Assignee</summary>
            <Div position="absolute">
              <SelectMenu />
            </Div>
          </Details>
          <Details>
            <summary>Assignee</summary>
            <Div position="absolute">
              <SelectMenu />
            </Div>
          </Details>
          <Details>
            <summary>Assignee</summary>
            <Div position="absolute">
              <SelectMenu />
            </Div>
          </Details>
        </Div>
      </Div>
    </Div>
  );
};

export default ListHeader;
