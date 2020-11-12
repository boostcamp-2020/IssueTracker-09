import React, { useState } from 'react';
import {
  Modal,
  Title,
  ListItem,
  DummyImage,
  Name,
  Image,
  Color,
  Input,
} from './styled';

const DropdownItem = ({ title, data, changeState, serverData }) => {
  const clickHandler = (item) => {
    changeState(item);
  };
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
      <Title>{title}</Title>
      <Input
        placeholder={`Filter ${title}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {data?.map((item, index) => {
        if (!checkItem(item)) {
          return null;
        }
        return (
          <ListItem key={index} onClick={() => clickHandler(item)}>
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
            {serverData.some((d) => d?.id === item.id) ? (
              <div>v</div>
            ) : (
              <div> </div>
            )}
          </ListItem>
        );
      })}
    </Modal>
  );
};

export default DropdownItem;
