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
`;

const Details = styled.details`
  padding: 10px;
  summary::-webkit-details-marker {
    display: none;
  }
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

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  border: 1px solid lightGray;
  display: flex;
  align-items: center;
`;

export { Div, Container, IssueMark, Details };
