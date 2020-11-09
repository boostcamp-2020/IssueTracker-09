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
  height: 200px;
  flex-direction: column;
  background: #ffffff;
  overflow: auto;
  border: 1px solid black;
  border-radius: 5px;
`;

const Div = styled.div`
  margin: 0 5px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.span`
  flex: 1;
  font-size: 20px;
  font-weight: 600;
`;
const CloseButton = styled.span``;

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
const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 10px;
  display: block;
  width: 20px;
  height: 20px;
`;

const DummyImage = styled.div`
  border-radius: 10px;
  display: block;
  background-color: gray;
  width: 20px;
  height: 20px;
`;

const Color = styled.div`
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const Input = styled.input`
  margin: 0 auto;
  width: 90%;
`;

export {
  Div,
  Modal,
  Title,
  CloseButton,
  ListItem,
  Image,
  Name,
  DummyImage,
  Color,
  Input,
};
