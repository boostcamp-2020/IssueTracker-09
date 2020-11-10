/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Div, IssueMark, Container } from './styled';
import { IssueContext } from '../../stores/issueStore';
import DropDown from '../Dropdown';
import { getUsersAPI } from '../../apis/user';
import { getLabelsAPI } from '../../apis/label';
import { getMilestonesAPI } from '../../apis/milestone';
import makeSearch from '../../lib/make-search';

const ListHeader = ({ checkedHandler, checked }) => {
  const {
    issueState: { list, search },
  } = useContext(IssueContext);

  const toggleInput = (event) => {
    if (!event.target.checked) {
      return checkedHandler([]);
    }
    return checkedHandler(list.map((c) => c.id));
  };

  return (
    <Container>
      <Div padding="10px">
        <input
          type="checkbox"
          checked={
            checked.length === list.length || checked.length === 25
              ? 'checked'
              : ''
          }
          onChange={toggleInput}
        />
      </Div>
      <Div width="100%">
        {checked.length ? (
          <Div padding="10px" width="150px">
            {checked.length} selected
          </Div>
        ) : (
          <Div padding="10px 0px">
            <Link to={makeSearch(`is:open`, search)}>
              <Div margin="0 10px 0 0">
                <IssueMark>!</IssueMark>
                <Div>OPEN</Div>
              </Div>
            </Link>
            <Link to={makeSearch(`is:close`, search)}>
              <Div>
                <FontAwesomeIcon icon={faCheck} size="1x" color="gray" />
                <Div margin="0 0 0 5px">CLOSE</Div>
              </Div>
            </Link>
          </Div>
        )}
        <Div width="100%" align="flex-end">
          <DropDown title="Author" action={getUsersAPI} />
          <DropDown title="Label" action={getLabelsAPI} />
          <DropDown title="Milestone" action={getMilestonesAPI} />
          <DropDown title="Assignee" action={getUsersAPI} />
        </Div>
      </Div>
    </Container>
  );
};

export default ListHeader;
