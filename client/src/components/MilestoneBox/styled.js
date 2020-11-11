import styled from 'styled-components';

export const Container = styled.div``;

export const ContentsBox = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
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
  margin-rigth: 5px;
  border-radius: 6px;
  border: 1px solid #e7e9ec;
  background-color: #fafbfc;
`;
