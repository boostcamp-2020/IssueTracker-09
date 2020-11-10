/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default-member
import IssueItem from '../IssueItem';

import { List } from './styled';
import { IssueContext } from '../../stores/issueStore';

const IssueList = ({ checkedHandler, checked }) => {
  const {
    issueState: { list },
    issueAction: { getList },
  } = useContext(IssueContext);

  useEffect(async () => {
    const newSearch = window.location.search.substring(3)
      ? window.location.search.substring(3).replace(/(%20)/g, ' ')
      : 'is:open';
    await getList(newSearch);
  });

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
