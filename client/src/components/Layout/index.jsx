import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to="/">
        <Issue>Issues</Issue>
      </Link>
    </Header>
  );
};

export default Layout;
