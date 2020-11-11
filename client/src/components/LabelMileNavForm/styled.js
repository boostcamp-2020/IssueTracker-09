import styled from 'styled-components';

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

export const LinkButtons = styled.div`
  display: flex;
`;

export const LinkName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 15px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid ${(props) => (props.path ? '#6495ED' : 'lightgray')};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.path ? '#6495ED' : 'white')};
  color: ${(props) => (props.path ? 'white' : 'black')};
  &:hover {
    background-color: lightgray;
  }
`;

export const NewButton = styled.button`
  background-color: white;
  border: none;
  padding: 0 10px;
  color: white;
  background-color: ${(props) => props.theme.greenColor};
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
`;

export const NewBox = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 15px;
  border: 1px;
  display: ${(props) => props.display};
`;
