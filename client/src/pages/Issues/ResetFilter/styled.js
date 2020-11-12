import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  margin: 10px auto;
`;
const CloseMark = styled.div`
  width: 17px;
  height: 17px;
  display: flex;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 900;
  color: black;
  border: 1.5px solid gray;
  background: #666666;
  color: #dddddd;
  border-radius: 5px;
`;
const FlexDiv = styled.div`
  display: flex;
  margin: 5px 0;
`;
export { Container, CloseMark, FlexDiv };
