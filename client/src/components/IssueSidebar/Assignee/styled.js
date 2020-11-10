import styled from 'styled-components';

export const Item = styled.div`
  margin: 3px 5px;
  padding: 3px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const DummyImage = styled.div`
  border-radius: 10px;
  display: block;
  background-color: gray;
  width: 20px;
  height: 20px;
`;

export const Name = styled.span`
  font-size: 13px;
  margin-left: 10px;
`;
export const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 10px;
  display: block;
  width: 20px;
  height: 20px;
`;

export const Span = styled.span`
  font-size: 14px;
  padding-left: 10px;
  color: gray;
`;
