import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.blackColor};
`;

export const Issue = styled.h1`
  margin: 0 20px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 30px;
  font-weight: bold;
`;
