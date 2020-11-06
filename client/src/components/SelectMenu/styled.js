import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  padding: 16px;
  width: 200px;
  height: 400px;
  flex-direction: column;
  background: #ffffff;
  overflow: auto;
`;

const Div = styled.div`
  margin: 0 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.span`
  flex: 1;
  font-size: 20px;
  margin: 0 auto;
  font-weight: 600;
`;
const CloseButton = styled.span``;

const ListItem = styled.a`
  display: flex;
  padding: 10px;
  margin: 5px;
  justify-content: space-around;
`;

const Name = styled.div`
  font-size: 10px;
  margin: auto;
`;
const Image = styled.img.attrs({
  alt: 'github-icon',
})`
  border-radius: 10px;
  display: block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
export { Div, Modal, Title, CloseButton, ListItem, Image, Name };
