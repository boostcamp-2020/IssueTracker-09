/* eslint-disable react/self-closing-comp */

import React, { useContext } from 'react';
import { Div, Details } from './styled';
import SelectMenu from '../SelectMenu';
import { UsersContext } from '../../stores/usersStore';

const ListHeader = () => {
  const {
    usersAction: { getUsers },
  } = useContext(UsersContext);
  return (
    <Div width="60%" margin="0 auto" border="1px solid lightGray">
      <Div padding="10px">
        <input type="checkbox"></input>
      </Div>
      <Div width="100%">
        <Div padding="10px"> close/open</Div>
        <Div width="100%" align="flex-end">
          <Details
            onClick={() => {
              getUsers();
            }}
          >
            <summary>Assignee</summary>
            <Div position="absolute">
              <SelectMenu title="author" />
            </Div>
          </Details>
        </Div>
      </Div>
    </Div>
  );
};

export default ListHeader;
