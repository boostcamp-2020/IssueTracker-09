/* eslint-disable react/self-closing-comp */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../stores/usersStore';
import { ListItem, Modal, Title, Image, Name, Div } from './styled';
import makeSearch from '../../lib/make-search';

const SelectMenu = ({ title }) => {
  const {
    usersState: { users },
  } = useContext(UsersContext);

  return (
    <Modal>
      <Div>
        <Title>author</Title>
      </Div>
      <Div>
        {users.map((item, index) => (
          <Link
            to={makeSearch(`${title}:${item.name}`, 'author:123')}
            key={index}
          >
            <ListItem>
              <Image width="20px" height="20px" src={item.image} />
              <Name>{item.name}</Name>
            </ListItem>
          </Link>
        ))}
      </Div>
    </Modal>
  );
};

export default SelectMenu;
