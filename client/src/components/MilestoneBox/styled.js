import styled from 'styled-components';

export const Container = styled.div``;

export const ContentsBox = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
`;

export const TitleInput = styled.input`
  padding: 5px 12px;
  width: 440px;
  max-width: 100%;
  margin-rigth: 5px;
  border-radius: 6px;
  border: 1px solid #e7e9ec;
  background-color: #fafbfc;
  line-height: 20px;
  placeholder: ${(props) => props.placeholder};
  type: ${(props) => props.type};
`;

export const DescriptionInput = styled.textarea`
  padding: 5px 12px;
  width: 60%;
  height: 200px;
  min-height: 200px;
  margin-rigth: 5px;
  border-radius: 6px;
  border: 1px solid #e7e9ec;
  background-color: #fafbfc;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: white;
  border-color: #1b1f2326;
  margin-left: 3px;
  padding: 10px 10px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  font-weight: bold;
  color: ${(props) => props.color};
  border-radius: 7px;
  cursor: pointer;
`;
