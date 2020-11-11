import React, { useContext } from 'react';
import { Div, ListItem, Name, Modal } from './styled';
import { updateState } from '../../apis/issue';
import { IssueContext } from '../../stores/issueStore';

const MarkAs = ({ checked, checkHandler }) => {
  const {
    issueState: { search },
    issueAction: { getList },
  } = useContext(IssueContext);

  const clickHandler = async (isOpened) => {
    const result = await updateState(checked, isOpened);

    if (result) {
      checkHandler([]);
      getList(search, true);
    }
  };

  return (
    <Modal>
      <Div
        onClick={() => {
          clickHandler(true);
        }}
      >
        <ListItem>
          <Name>open</Name>
        </ListItem>
      </Div>
      <Div
        onClick={() => {
          clickHandler(false);
        }}
      >
        <ListItem>
          <Name>close</Name>
        </ListItem>
      </Div>
    </Modal>
  );
};

export default MarkAs;
