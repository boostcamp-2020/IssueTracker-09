/* eslint-disable react/self-closing-comp */

import React, { useContext } from 'react';
import { IssueContext } from '../../stores/issueStore';
import { UsersContext } from '../../stores/usersStore';
import { ListItem, Modal, Title, Image, Name, Div } from './styled';

const SelectMenu = () => {
  const {
    usersState: { users },
  } = useContext(UsersContext);
  const {
    issueAction: { getList },
  } = useContext(IssueContext);
  return (
    <Modal>
      <Div>
        <Title>author</Title>
      </Div>
      <Div>
        {users.map((item, index) => (
          <ListItem onClick={() => getList(`author:${item.name}`)} key={index}>
            <Image width="20px" height="20px" src={item.image} />
            <Name>{item.name}</Name>
          </ListItem>
        ))}
      </Div>
    </Modal>
  );
};

export default SelectMenu;
