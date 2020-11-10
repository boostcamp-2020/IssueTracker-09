import React from 'react';
import {
  Modal,
  Title,
  ListItem,
  DummyImage,
  Name,
  Image,
  Color,
} from './styled';

const DropdownItem = ({ title, data, changeState, serverData }) => {
  const clickHandler = (item) => {
    changeState(item);
  };

  return (
    <Modal>
      <Title>{title}</Title>
      {data?.map((item, index) => {
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
