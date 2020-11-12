import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #dddddd;
`;

const Status = styled.div`
  width: ${(props) => props.percentage}%;
  height: 10px;
  border-radius: 4px;
  background-color: green;
`;

const Div = styled.div`
  width: ${(props) => props.width};
  padding: 5px;
`;

const Title = styled.div`
  font-size: 30px;
  padding: 5px;
`;

const Span = styled.span`
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
`;

const PointSpan = styled.span`
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  cursor: pointer;
`;

export { Container, Status, Div, Title, Span, PointSpan };
