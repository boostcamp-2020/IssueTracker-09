import styled from 'styled-components';

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

export const FilterBox = styled.details`
  width: 80px;
  padding: 0 10px;
  border-right: 1px solid lightGray;
`;

export const SearchContainer = styled.div`
  width: 68%;
  height: 30px;
  border: 1px solid lightGray;
  border-radius: 7px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  border: none;
  width: calc(100% - 80px);
  padding-left: 10px;
  font-size: 14px;
`;

export const LinkName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

export const OtherButton = styled.div`
  display: flex;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  padding: 0 10px;
  color: white;
  background-color: ${(props) => props.theme.greenColor};
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
`;
