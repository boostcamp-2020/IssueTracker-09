import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: calc(100% - 10px);
  resize: none;
  height: 100px;
  margin: 5px;
  overflow: auto;
  padding: 5px;
  border-color: #dddddd;
  &:focus {
    outline: none;
  }
`;
export const WriteBox = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: 5px;
  margin: 2px;
  border: 1px solid #d2e1f7;
`;

export const Header = styled.div`
  position: relative;
  padding: ${(props) => props.padding};
  border-bottom: 1px solid #d2e1f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.color};
`;

export const Square = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color || 'white'};
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%) rotate(45deg);
  border-bottom: 1px solid #d2e1f7;
  border-left: 1px solid #d2e1f7;
  z-index: 1;
`;

export const IsOpened = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cc2431;
  height: 30px;
  border-radius: 7px;
  border: none;
  margin: 3px 7px;
  font-size: 18px;
  &:hover {
    background-color: #cc2431;
    color: white;
  }
`;

export const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 150px;
  border-radius: 7px;
  background-color: #2ea44e;
  border: none;
  color: white;
  font-weight: bold;
  margin: 3px 7px;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #cccccc;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 5px;
  margin: 10px 10px 0px 10px;
  border: 1px solid #dddddd;
`;

export const NewHeader = styled.div`
  position: relative;
`;

export const WriteDiv = styled.div`
  margin-left: 5px;
  margin-top: 5px;
  padding: 5px 10px 6px 10px;
  top: 1px;
  border-left: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  background: white;
  position: relative;
`;
