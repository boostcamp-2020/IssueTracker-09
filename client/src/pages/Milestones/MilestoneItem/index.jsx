import React from 'react';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Status, Div, Title, Span, PointSpan } from './styled';

const MilestoneItem = ({ milestone, state, updateEvent, deleteEvent }) => {
  if (milestone?.is_opened !== state) {
    return null;
  }

  return (
    <Container>
      <Div width="50%">
        <Title>{milestone.title}</Title>
        <Div>
          <FontAwesomeIcon icon={faCalendar} />
          <Span padding="0 5px">Due by {milestone.deadline}</Span>
        </Div>
        <Div>{milestone.content}</Div>
      </Div>
      <Div width="50%">
        <Div>
          <Status
            percentage={Math.ceil(
              (1 - milestone.openCount / milestone.totalCount) * 100
            )}
          />
        </Div>
        <Div>
          <Span>
            {milestone.totalCount !== 0
              ? Math.ceil(
                  (1 - milestone.openCount / milestone.totalCount) * 100
                )
              : 100}
            % complete
          </Span>
          <Span padding="0 10px">{milestone.openCount} open</Span>
          <Span>{milestone.totalCount - milestone.openCount} close</Span>
        </Div>
        <Div>
          <PointSpan color="blue">Edit</PointSpan>
          <PointSpan
            color="blue"
            padding="0 10px"
            onClick={() => updateEvent(milestone.id, !milestone.is_opened)}
          >
            {state ? 'Close' : 'Open'}
          </PointSpan>
          <PointSpan color="red" onClick={() => deleteEvent(milestone.id)}>
            Delete
          </PointSpan>
        </Div>
      </Div>
    </Container>
  );
};

export default MilestoneItem;
