import React, { useState } from 'react';
import EditLabel from '../EditLabel';
import { FlexDiv, LabelIcon, Description, ButtonDiv, Span } from './styled';

const LabelItem = ({ label }) => {
  if (!label) {
    return null;
  }

  const [labelInfo, setLabelInfo] = useState(label);
  const [state, setState] = useState(false);

  return (
    <>
      {state ? (
        <EditLabel action={setState} label={labelInfo} />
      ) : (
        <FlexDiv>
          <LabelIcon color={labelInfo.color}>{labelInfo.title}</LabelIcon>
          <Description>{labelInfo.content}</Description>
          <ButtonDiv>
            <Span onClick={() => setState(true)}>Edit</Span>
            <Span>Delete</Span>
          </ButtonDiv>
        </FlexDiv>
      )}
    </>
  );
};

export default LabelItem;
