import styled from 'styled-components';

const Div = styled.div`
  position: ${(props) => props.position};
  display: flex;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  justify-content: ${(props) => props.align};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
`;

// eslint-disable-next-line import/prefer-default-export
export { Div };