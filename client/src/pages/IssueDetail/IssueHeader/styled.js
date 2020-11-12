import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: ${(props) => props.align};
  align-items: center;
  margin-bottom: 10px;
`;

export const InputBox = styled.input`
  width: 90%;
  height: 30px;
  padding: 5px 1px;
  font-size: 15px;
  padding-left: 10px;
  border-radius: 10px;
  border: 1px solid black;
`;

export const Div = styled.div`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  color: gray;
  padding-left: 10px;
`;

export const Span = styled.span`
  font-size: 40px;
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
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 6px 7px;
`;

export const Button = styled.button`
  background-color: white;
  padding: 7px 12px;
  border: 1px solid lightgray;
  border-radius: 5px;
  &:hover {
    background-color: lightgray;
  }
`;

export const Id = styled.span`
  margin-left: 10px;
  font-size: 30px;
  color: #aaa;
`;
