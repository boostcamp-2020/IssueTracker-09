import styled from 'styled-components';

const Modal = styled.div`
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  padding: 6px 3px;
  width: 150px;
  height: 70px;
  flex-direction: column;
  background: #ffffff;
  overflow: auto;
  border: 1px solid black;
  border-radius: 5px;
`;

const ListItem = styled.div`
  display: flex;
  margin: 3px 5px;
  padding: 3px 0;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Name = styled.span`
  font-size: 13px;
  margin-left: 10px;
`;
const Div = styled.div`
  margin: 0 5px;
  font-size: 30px;
  font-weight: bold;
`;

export { Div, ListItem, Name, Modal };
