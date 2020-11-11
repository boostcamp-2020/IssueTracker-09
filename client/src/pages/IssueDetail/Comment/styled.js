import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Span = styled.span`
  width: 100%;
  font-size: 60px;
  font-weight: bolder;
`;

export const CommentContainer = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: 5px;
  margin: 2px;
`;
export const Header = styled.div`
  border-bottom: 1px solid;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;
export const Body = styled.div`
  padding: 5px;
`;
export const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 10px;
  display: block;
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;
