import React, { useState, useContext } from 'react';
import { ListItem, Name } from './styled';
import closeOrOpen from '../../apis/open-close';
import { IssueContext } from '../../stores/issueStore';

const MarkAs = ({ checked }) => {
  const {
    issueState: { search },
    issueAction: { getList }
  } = useContext(IssueContext);

  const clickHandler = async (isOpened) => {
    const result = await closeOrOpen(checked, isOpened);
    
    if( result ){
        getList(search, true);
    }

  };

  return (
    <>
      <div
        onClick={() => {
          clickHandler(true);
        }}
      >
        <ListItem>
          <Name>open</Name>
        </ListItem>
      </div>
      <div
        onClick={() => {
          clickHandler(false);
        }}
      >
        <ListItem>
          <Name>close</Name>
        </ListItem>
      </div>
    </>
  );
};

export default MarkAs;
