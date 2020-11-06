import React, { useContext } from 'react';

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header, Issue } from './styled';

import { UserContext } from '../../stores/userStore';

const Layout = () => {
  const {
    userState: { name },
  } = useContext(UserContext);

  if (!name) {
    return null;
  }
  return (
    <Header>
      <FontAwesomeIcon icon={faBook} size="2x" color="white" />
      <Issue>Issues</Issue>
    </Header>
  );
};

export default Layout;
