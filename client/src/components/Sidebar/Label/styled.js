import styled from 'styled-components';

export const Span = styled.span`
  font-size: 14px;
  padding-left: 10px;
  color: gray;
`;

export const Label = styled.div`
  display: inline-block;
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 10px;
  padding: 4px 8px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
`;
