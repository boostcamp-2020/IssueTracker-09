/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import EditLabel from '../../../components/EditLabel';
import { FlexDiv, LabelIcon, Description, ButtonDiv, Span } from './styled';
import { updateLabelAPI, deleteLabelAPI } from '../../../apis/label';

const LabelItem = ({ label }) => {
  const [labelInfo, setLabelInfo] = useState(label);
  const [state, setState] = useState(false);

  if (!labelInfo) {
    return null;
  }

  const updateHandler = async (data) => {
    const result = await updateLabelAPI(labelInfo.id, data);
    if (result) {
      setLabelInfo({ ...data, id: labelInfo.id });
    }
    setState(false);
  };

  const deleteHandler = async () => {
    const result = await deleteLabelAPI(labelInfo.id);
    if (result) {
      setLabelInfo(null);
    }
  };

  return (
    <>
      {state ? (
        <EditLabel
          action={setState}
          label={labelInfo}
          deleteEvent={deleteHandler}
          updateEvent={updateHandler}
        />
      ) : (
        <FlexDiv>
          <LabelIcon color={labelInfo.color}>{labelInfo.title}</LabelIcon>
          <Description>{labelInfo.content}</Description>
          <ButtonDiv>
            <Span onClick={() => setState(true)}>Edit</Span>
            <Span onClick={deleteHandler}>Delete</Span>
          </ButtonDiv>
        </FlexDiv>
      )}
    </>
  );
};

export default LabelItem;
