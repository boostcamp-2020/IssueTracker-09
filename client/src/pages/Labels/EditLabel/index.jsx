/* eslint-disable react/button-has-type */
import React, { useState, useRef } from 'react';
import {
  FlexDiv,
  LabelIcon,
  Div,
  Container,
  Input,
  ColorInput,
  Refresh,
} from './styled';

const EditLabel = ({ action, label }) => {
  const [nameValue, setNameValue] = useState(label.title);
  const [colorValue, setColorValue] = useState(label.color);
  const desValue = useRef(null);
  const isDisabled =
    !nameValue || !(colorValue.length === 7 || colorValue.length === 4);

  const changeHandler = (e) => {
    if (e.target.value === '') {
      e.target.value = '#';
    }
    if (e.target.value.length > 7) {
      e.target.value = e.target.value.substring(0, 7);
    }
    setColorValue(e.target.value);
  };

  return (
    <Container>
      <FlexDiv>
        <LabelIcon color={colorValue}>{nameValue || 'Label preview'}</LabelIcon>
        <div>Delete</div>
      </FlexDiv>
      <FlexDiv>
        <Div>
          <div>Label name</div>
          <Input
            value={nameValue}
            placeholder="Label name"
            onChange={(e) => setNameValue(e.target.value)}
          />
        </Div>
        <Div>
          <div>Description</div>
          <Input
            defaultValue={label.content}
            ref={desValue}
            placeholder="Description (optional)"
          />
        </Div>
        <Div>
          <div>color</div>
          <FlexDiv>
            <Refresh color={colorValue} />
            <ColorInput
              value={colorValue}
              onChange={(event) => changeHandler(event)}
            />
          </FlexDiv>
        </Div>
        <div>
          <button onClick={() => action(false)}>cancel</button>
          <button disabled={isDisabled}>Save changes</button>
        </div>
      </FlexDiv>
    </Container>
  );
};

export default EditLabel;
