/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React, { useContext } from 'react';
import { Div } from './styled';
import { UsersContext } from '../../stores/usersStore';
import { IssueContext } from '../../stores/issueStore';
import DropDown from '../Dropdown';

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
          <DropDown title="Author" action={getUsers} />
          <DropDown title="Label" action={getUsers} />
          <DropDown title="Milestone" action={getUsers} />
          <DropDown title="Assignee" action={getUsers} />
        </Div>
      </Div>
    </Div>
  );
};

export default ListHeader;
