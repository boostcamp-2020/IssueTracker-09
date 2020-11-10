/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Checkbox,
  Issue,
  Id,
  Item,
  Assignee,
  Assignees,
  Closed,
  Text,
  Title,
  Top,
  Label,
  Milestone,
  Bottom,
  DummyImage,
} from './styled';

const Issues = ({ issue, checkedHandler, checked }) => {
  return (
    <Item>
      <Checkbox
        data-testid="checkbox"
        type="checkbox"
        checked={checked.includes(issue.id) ? 'checked' : ''}
        onChange={() => checkedHandler(issue.id)}
      />
      <Issue>
        <Top>
          <Closed isOpened={issue.is_opened}>!</Closed>
          <Link to={`/issues/${issue.id}`}>
            <Title>{issue.title}</Title>
          </Link>
          {issue.Labels.map((label, index) => (
            <Label key={`label${index}`} color={label.color}>
              {label.title}
            </Label>
          ))}
        </Top>
        <Bottom>
          <Id>#{issue.id}</Id>
          <Text>
            {issue.is_opened
              ? `opened yesterday by ${issue.User.name}`
              : `closed by ${issue.User.name} yesterday`}
          </Text>
          {issue.Milestone ? (
            <>
              <FontAwesomeIcon icon={faFlag} />
              <Milestone>{issue.Milestone.title}</Milestone>
            </>
          ) : (
            ''
          )}
        </Bottom>
      </Issue>
      <Assignees>
        {issue.Assignees.map((assignee, index) =>
          assignee.image ? (
            <Assignee src={assignee.image} key={`assignee${index}`} />
          ) : (
            <DummyImage key={`assignee${index}`} />
          )
        )}
      </Assignees>
    </Item>
  );
};

Issues.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    is_opened: PropTypes.bool,
    Assignees: PropTypes.array,
    Labels: PropTypes.array,
    User: PropTypes.shape({
      name: PropTypes.string,
    }),
    Milestone: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      deadline: PropTypes.string,
      is_opened: PropTypes.bool,
    }),
  }),
};

export default Issues;
