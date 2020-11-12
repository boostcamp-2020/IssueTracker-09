// eslint-disable-import/prefer-default-export
import styled from 'styled-components';

const Div = styled.div`
  position: ${(props) => props.position};
  display: flex;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  justify-content: ${(props) => props.align};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  font-weight: ${(props) => (props.state === true ? 'bolder' : '')};
  cursor: pointer;
`;

const Container = styled.div`
  border-bottom: solid 1px #dddddd;
  padding: 15px 10px;
  display: flex;
  background-color: #f3f3f3;
`;

export { Div, Container };
