import React, { useContext, useEffect } from 'react';
import IssueItem from '../IssueItem';

import { List } from './styled';
import { IssueContext } from '../../stores/issueStore';

const IssueList = () => {
  const {
    issueState: { list },
    issueAction: { getList },
  } = useContext(IssueContext);
  useEffect(async () => {
    await getList('is:open');
  }, []);
  return (
    <List>
      {list.map((issue, index) => (
        <IssueItem issue={issue} key={index} />
      ))}
    </List>
  );
};

export default IssueList;
