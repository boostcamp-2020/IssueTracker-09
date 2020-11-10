import styled from 'styled-components';

const ListItem = styled.div`
  display: flex;
  margin: 3px 5px;
  padding: 3px 0;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Name = styled.span`
  font-size: 13px;
  margin-left: 10px;
`;

export { ListItem, Name };
