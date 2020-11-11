import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #dddddd;
  padding: 5px;
`;

export const LabelIcon = styled.span`
  padding: 5px 12px;
  border-radius: 10px;
  margin-left: 10px;
  color: white;
  background-color: ${(props) => props.color};
`;

export const Description = styled.div`
  width: 50%;
  padding: 7px;
  margin: 4px 2px;
`;
export const ButtonDiv = styled.div`
  width: 20%;
  display: flex;
  padding: 7px;
  justify-content: flex-end;
  margin: 4px 2px;
`;
export const Span = styled.span`
  margin: 0 5px;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
`;
