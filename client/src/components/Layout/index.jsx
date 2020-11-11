import React, { useContext } from 'react';

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header, Issue } from './styled';
import { CLIENT_URL } from '../../config';

import { UserContext } from '../../stores/userStore';

const Layout = () => {
  const {
    userState: { name },
  } = useContext(UserContext);

  if (!name) {
    return null;
  }

  const clickHandler = () => {
    window.location.href = CLIENT_URL;
  };

  return (
    <Header>
      <FontAwesomeIcon icon={faBook} size="2x" color="white" />
      <Issue onClick={() => clickHandler(true)}>Issues</Issue>
    </Header>
  );
};

export default Layout;
