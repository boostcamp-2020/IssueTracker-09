/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

const EditLabel = ({
  updateEvent,
  action,
  deleteEvent,
  createEvent,
  label,
  type = null,
}) => {
  const [nameValue, setNameValue] = useState(label.title);
  const [colorValue, setColorValue] = useState(label.color);
  const desValue = useRef(null);
  const isDisabled =
    !nameValue || !(colorValue.length === 7 || colorValue.length === 4);

  const isValid = () => {
    const [result] = colorValue.match(/(#)[a-f0-9]+/i);
    if (result === colorValue) {
      return false;
    }
    return true;
  };

  const changeHandler = (e) => {
    if (e.target.value.length > 7) {
      e.target.value = e.target.value.substring(0, 7);
    }
    setColorValue(e.target.value);
  };

  const randomColor = () => {
    const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    setColorValue(color);
  };

  return (
    <Container>
      <FlexDiv>
        <LabelIcon color={colorValue}>{nameValue || 'Label preview'}</LabelIcon>
        <div onClick={() => deleteEvent()}>Delete</div>
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
            <Refresh color={colorValue} onClick={randomColor} />
            <ColorInput
              value={colorValue}
              onChange={(event) => changeHandler(event)}
            />
          </FlexDiv>
        </Div>
        <div>
          <button onClick={() => action(false)}>cancel</button>
          {type ? (
            <button
              disabled={isDisabled || isValid()}
              onClick={() =>
                createEvent({
                  title: nameValue,
                  color: colorValue,
                  content: desValue.current.value,
                })
              }
            >
              Create label
            </button>
          ) : (
            <button
              disabled={isDisabled || isValid()}
              onClick={() =>
                updateEvent({
                  title: nameValue,
                  color: colorValue,
                  content: desValue.current.value,
                })
              }
            >
              Save changes
            </button>
          )}
        </div>
      </FlexDiv>
    </Container>
  );
};

export default EditLabel;
