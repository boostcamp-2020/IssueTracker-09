import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Span = styled.span`
  width: 100%;
  font-size: 60px;
  font-weight: bolder;
`;

export const CommentContainer = styled.div`
  width: 100%;
  border: 1px solid #d2e1f7;
  border-radius: 5px;
  margin-left: 7px;
`;
export const Header = styled.div`
  position: relative;
  border-bottom: 1px solid #d2e1f7;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d2e1f7;
`;
export const Body = styled.div`
  padding: 10px;
  font-size: 14px;
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

export const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
`;

export const Date = styled.span`
  padding-left: 5px;
  font-size: 14px;
  color: gray;
`;

export const Title = styled.span`
  padding: 5px;
`;

export const Square = styled.div`
  width: 10px;
  height: 10px;
  background-color: #d2e1f7;
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%) rotate(45deg);
`;
