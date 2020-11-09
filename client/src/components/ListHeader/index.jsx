/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */

import React, { useContext } from 'react';
import { Div, Details } from './styled';
import SelectMenu from '../SelectMenu';
import { UsersContext } from '../../stores/usersStore';
import { IssueContext } from '../../stores/issueStore';

const ListHeader = ({ checkedHandler, checked }) => {
  const {
    usersAction: { getUsers },
  } = useContext(UsersContext);
  const {
    issueState: { list },
  } = useContext(IssueContext);

  const toggleInput = (event) => {
    if (!event.target.checked) {
      return checkedHandler([]);
    }
    return checkedHandler(list.map((c) => c.id));
  };

  return (
    <Div width="60%" margin="0 auto" border="1px solid lightGray">
      <Div padding="10px">
        <input
          type="checkbox"
          checked={
            checked.length === list.length || checked.length === 25
              ? 'checked'
              : ''
          }
          onChange={toggleInput}
        />
      </Div>
      <Div width="100%">
        {checked.length ? (
          <Div padding="10px"> {checked.length} selected</Div>
        ) : (
          <Div padding="10px"> close/open</Div>
        )}
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
