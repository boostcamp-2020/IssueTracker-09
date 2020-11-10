import styled from 'styled-components';

export const Modal = styled.div`
  background-color: white;
  position: absolute;
  width: 150px;
  height: 200px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 100;
  overflow: auto;
`;

export const Title = styled.h2``;

export const ListItem = styled.div`
  display: flex;
  margin: 3px 5px;
  padding: 3px 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  cursor: pointer;
`;

export const DummyImage = styled.div`
  border-radius: 10px;
  display: block;
  background-color: gray;
  width: 20px;
  height: 20px;
`;

export const Color = styled.div`
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

export const Name = styled.span`
  font-size: 13px;
  margin-left: 10px;
`;
export const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 10px;
  display: block;
  width: 20px;
  height: 20px;
`;
