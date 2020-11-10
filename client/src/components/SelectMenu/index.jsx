/* eslint-disable react/self-closing-comp */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  Modal,
  Title,
  Image,
  Name,
  Div,
  DummyImage,
  Color,
} from './styled';
import makeSearch from '../../lib/make-search';
import { IssueContext } from '../../stores/issueStore';

const SelectMenu = ({ title, data, checked }) => {
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
            <Link
              to={makeSearch(
                `${title}:${item.title ? item.title : item.name}`,
                search
              )}
              key={index}
            >
              <ListItem>
                {item.image === '' ? (
                  <>
                    <DummyImage />
                    <Name>{item.name}</Name>
                  </>
                ) : item.image ? (
                  <>
                    <Image image={item.image} />
                    <Name>{item.name}</Name>
                  </>
                ) : (
                  ''
                )}
                {item.color ? <Color color={item.color} /> : ''}
                {item.title ? <Name>{item.title}</Name> : ''}
              </ListItem>
            </Link>
          ))
                }
      </Div>
    </Modal>
  );
};

export default SelectMenu;
