/* eslint-disable react/self-closing-comp */

import React from 'react';
import { ListItem, Modal, Title, Image, Name, Div } from './styled';

const SelectMenu = () => {
  const title = 'author';
  const test = [
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
    {
      name: 'joojaewoo',
      image: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    },
  ];
  return (
    <Modal>
      <Div>
        <Title>{title}</Title>
      </Div>
      <Div />
      <Div>
        {test.map((item) => (
          <ListItem>
            <Image width="20px" height="20px" src={item.image} />
            <Name>{item.name}</Name>
          </ListItem>
        ))}
      </Div>
    </Modal>
  );
};

export default SelectMenu;
