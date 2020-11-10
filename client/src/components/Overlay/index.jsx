/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import Div from './styled';

const Overlay = () => {
  useEffect(() => {
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', () => {
      const details = Object.entries(document.getElementsByTagName('details'));
      details.forEach(([_, detail]) => {
        detail.toggleAttribute('open', false);
      });
      overlay.hidden = true;
    });
  }, []);

  return <Div />;
};

export default Overlay;
