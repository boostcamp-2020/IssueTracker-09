import styled from 'styled-components';

export const MileName = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 0 0 10px;
`;

export const Bar = styled.div`
  width: calc(100% - 20px);
  height: 10px;
  border-radius: 4px;
  background-color: lightgray;
  margin: 0 auto;
`;

export const Status = styled.div`
  width: ${(props) => props.percentage}%;
  height: 10px;
  border-radius: 4px;
  background-color: green;
`;

export const Span = styled.span`
  font-size: 14px;
  padding-left: 10px;
  color: gray;
`;

export const Delete = styled.span`
  font-size: 11px;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;
