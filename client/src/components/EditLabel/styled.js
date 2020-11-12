import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

export const LabelIcon = styled.div`
  padding: 7px 12px;
  border-radius: 15px;
  color: white;
  background-color: ${(props) => props.color};
`;
export const Div = styled.div`
  padding: 3px;
  margin: 3px;
  width: 25%;
`;

export const Input = styled.input`
  margin: 5px 0;
  padding: 5px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
`;

export const ColorInput = styled.input`
  display: inline;
  margin: 5px;
  padding: 5px;
  width: 80%;
  border: 1px solid black;
  border-radius: 5px;
`;

export const Container = styled.div`
  border-bottom: 1px solid #dddddd;
  background-color: #eeeeee;
  padding: 10px;
  border-radius: 10px;
`;

export const Refresh = styled.div`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export const Cancel = styled.button`
  padding: 5px 10px;
  margin: 3px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

export const Submit = styled.button`
  padding: 5px 10px;
  margin: 3px;
  font-weight: bold;
  background-color: #2c974b;
  color: white;
  border: 1px solid #2c974b;
  border-radius: 5px;
`;
