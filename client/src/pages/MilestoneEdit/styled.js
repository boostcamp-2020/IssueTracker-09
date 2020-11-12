import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 60%;
  margin: 0 auto;
  margin-top: 32px;
`;

export const H2 = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const LinkButtons = styled.div`
  display: flex;
  margin-bottom: 20px;
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
