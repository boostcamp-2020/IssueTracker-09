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

const IssueMark = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: black;
  border: 1.5px solid gray;
  border-radius: 8px;
`;

export { Div, IssueMark };
