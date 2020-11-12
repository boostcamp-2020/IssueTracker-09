/* eslint-disable no-unused-vars */
import React, { createRef } from 'react';

import Div from './styled';

const overlayElement = createRef();

const Overlay = () => {
  const clickHandler = (e) => {
    const details = Object.entries(document.getElementsByTagName('details'));
    details.forEach(([_, detail]) => {
      detail.toggleAttribute('open', false);
    });
    e.target.hidden = true;
  };
  return <Div onClick={(e) => clickHandler(e)} ref={overlayElement} />;
};

export { Overlay, overlayElement };
