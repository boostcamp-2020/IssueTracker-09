import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/global-style';
import App from './App';

import { UserProvider } from './stores/userStore';
import { IssueProvider } from './stores/issueStore';
import { UsersProvider } from './stores/usersStore';

ReactDom.render(
  <BrowserRouter>
    <UserProvider>
      <IssueProvider>
        <UsersProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </UsersProvider>
      </IssueProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
