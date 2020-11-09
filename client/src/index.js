/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/global-style';
import App from './App';

import { UserProvider } from './stores/userStore';
import { IssueProvider } from './stores/issueStore';

window.addEventListener('click', (e) => {
  const details = Object.entries(document.getElementsByTagName('details'));

  details.forEach(([_, detail]) => {
    if (!detail.contains(e.target)) {
      detail.toggleAttribute('open', false);
    }
  });
});
ReactDom.render(
  <BrowserRouter>
    <UserProvider>
      <IssueProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </IssueProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
