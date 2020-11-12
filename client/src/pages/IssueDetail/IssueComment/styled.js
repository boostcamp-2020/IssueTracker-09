import styled from 'styled-components';

export const Container = styled.div`
  width: 65%;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const InputBox = styled.input`
  width: 80%;
  height: 30px;
  padding: 5px 1px;
  font-size: 15px;
`;

export const Div = styled.div`
  width: ${(props) => props.width};
`;

export const Span = styled.span`
  width: 100%;
  font-size: 60px;
  font-weight: bolder;
`;

export const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 10px;
  display: block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
