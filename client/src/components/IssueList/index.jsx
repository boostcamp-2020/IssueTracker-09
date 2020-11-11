import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import IssueItem from '../IssueItem';
import { List } from './styled';
import { IssueContext } from '../../stores/issueStore';

const IssueList = ({ checkedHandler, checked }) => {
  const {
    issueState: { list },
    issueAction: { getList },
  } = useContext(IssueContext);

  const { search } = useLocation();

  const getListHandler = async () => {
    const newSearch = search.substring(3)
      ? search.substring(3).replace(/(%20)/g, ' ')
      : 'is:open';
    await getList(newSearch);
  };

  getListHandler();

  return (
    <List>
      {list.map((issue, index) => (
        <IssueItem
          issue={issue}
          key={index}
          checkedHandler={checkedHandler}
          checked={checked}
        />
      ))}
    </List>
  );
};

export default IssueList;
