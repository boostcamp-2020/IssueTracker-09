import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/global-style';
import App from './App';

import { UserProvider } from './stores/userStore';

ReactDom.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
