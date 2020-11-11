import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: ${(props) => props.align};
  margin-bottom: 10px;
`;

export const InputBox = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px 1px;
  font-size: 15px;
  border-radius: 10px;
`;

export const Div = styled.div`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
`;

export const Span = styled.span`
  width: 100%;
  font-size: 60px;
  font-weight: bolder;
`;
export const Icon = styled.div`
  border-radius: 100%;
  border: 1px solid white;
  width: 20px;
  text-align: center;
  margin-right: 5px;
`;
export const IconBackground = styled.div`
  background: ${(props) => (props.isOpen ? 'green' : 'red')};
  color: white;
  border-radius: 15px;
  display: flex;
  padding: 5px;
`;
