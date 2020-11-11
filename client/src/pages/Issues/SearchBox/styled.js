import styled from 'styled-components';

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

export const FilterBox = styled.details`
  position: relative;
  width: 80px;
  padding: 0 10px;
  border-right: 1px solid lightGray;
  summary::-webkit-details-marker {
    display: none;
  }
  z-index: 100;
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
  width: 100%;
  padding-left: 10px;
  font-size: 14px;
  z-index: 50;
`;

export const Form = styled.form`
  width: calc(100% - 80px);
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

export const DropdownItem = styled.div`
  font-size: 14px;
  padding: 3px;
  margin: 3px 0;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  background-color: white;
  width: 200px;
  padding: 6px 3px;
  border: 1px solid black;
  border-radius: 5px;
`;
