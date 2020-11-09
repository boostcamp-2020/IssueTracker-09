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

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 30px;
  border: 1px solid lightGray;
  display: flex;
  align-items: center;
`;

export { Div, Container };
