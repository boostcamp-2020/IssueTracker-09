import React, { useContext, useState } from 'react';
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
  Input,
} from './styled';
import makeSearch from '../../lib/make-search';
import { IssueContext } from '../../stores/issueStore';

const SelectMenu = ({ title, data }) => {
  const {
    issueState: { search },
  } = useContext(IssueContext);
  const [inputValue, setInputValue] = useState('');

  const checkItem = (item) => {
    if (
      (item.title && item.title.includes(inputValue)) ||
      (item.name && item.name.includes(inputValue)) ||
      inputValue === ''
    ) {
      return true;
    }
    return false;
  };

  return (
    <Modal>
      <Div>
        <Title>{title}</Title>
      </Div>
      <Input
        placeholder={`Filter ${title}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Div>
        {data?.map((item, index) => {
          if (!checkItem(item)) {
            return null;
          }
          return (
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
          );
        })}
      </Div>
    </Modal>
  );
};

export default SelectMenu;
