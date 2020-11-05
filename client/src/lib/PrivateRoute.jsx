/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../stores/userStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    userState: { name },
    userAction: { getUser },
  } = useContext(UserContext);

  // useEffect(() => {
  //   async function getHandler() {
  //     await getUser();
  //   }

  //   if (!name) {
  //     getHandler();
  //   }
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        name ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
