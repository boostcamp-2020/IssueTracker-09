import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  height: 70px;
  overflow: auto;
  border-radius: 3px;
  padding: 2px;
  margin-top: 5px;
`;
export const WriteBox = styled.div`
  width: 100%;
  border: 1px solid #d2e1f7;
  border-radius: 5px;
  margin: 2px;
`;

export const Cancel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cc2431;
  height: 30px;
  width: 100px;
  border-radius: 7px;
  border: none;
  margin: 3px 7px;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const Header = styled.div`
  position: relative;
  border-bottom: 1px solid #d2e1f7;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d2e1f7;
`;

export const Square = styled.div`
  width: 10px;
  height: 10px;
  background-color: #d2e1f7;
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%) rotate(45deg);
`;
