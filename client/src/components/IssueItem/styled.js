import styled from 'styled-components';

export const Checkbox = styled.input`
  margin-top: 15px;
`;

export const Item = styled.li`
  display: flex;
  height: 60px;
  padding-left: 10px;
  border: 1px solid lightGray;
  cursor: pointer;
`;

export const Issue = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Assignees = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Assignee = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

export const Closed = styled.div`
  width: 15px;
  height: 15px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (!props.is_opened ? 'green' : 'red')};
  border: 1.5px solid ${(props) => (!props.is_opened ? 'green' : 'red')};
  border-radius: 8px;
`;

export const Top = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
`;

export const Bottom = styled.div`
  height: 20px;
  padding-left: 35px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: gray;
`;

export const Title = styled.h2`
  font-weight: bold;
`;

export const Milestone = styled.span``;

export const Id = styled.span``;

export const Text = styled.span`
  margin: 0 5px;
`;

export const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;
  margin: 0 10px;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: bold;
  border-radius: 10px;
`;
