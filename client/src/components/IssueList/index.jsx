import React from 'react';
import IssueItem from '../IssueItem';
import dummy from './dummy';

import { List } from './styled';

const IssueList = () => {
  return (
    <List>
      {dummy.map((issue, index) => (
        <IssueItem issue={issue} key={index} />
      ))}
    </List>
  );
};

export default IssueList;
