/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
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
} from './styled';

const Issues = ({ issue }) => {
  return (
    <Item>
      <Checkbox type="checkbox" />
      <Issue>
        <Top>
          <Closed isOpened={issue.is_opened}>!</Closed>
          <Title>{issue.title}</Title>
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
          <FontAwesomeIcon icon={faFlag} />
          <Milestone>{issue.Milestone ? issue.Milestone.title : ''}</Milestone>
        </Bottom>
      </Issue>
      <Assignees>
        {issue.Assignees.map((assignee, index) => (
          <Assignee src={assignee.image} key={`assignee${index}`} />
        ))}
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
