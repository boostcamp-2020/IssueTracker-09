/* eslint-disable react/self-closing-comp */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, Modal, Title, Image, Name, Div } from './styled';
import makeSearch from '../../lib/make-search';
import { IssueContext } from '../../stores/issueStore';

const SelectMenu = ({ title, data }) => {
  console.log(title, data);
  const {
    issueState: { search },
  } = useContext(IssueContext);
  return (
    <Modal>
      <Div>
        <Title>{title}</Title>
      </Div>
      <Div>
        {data?.map((item, index) => (
          <Link to={makeSearch(`${title}:${item.name}`, "auth")} key={index}>
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
