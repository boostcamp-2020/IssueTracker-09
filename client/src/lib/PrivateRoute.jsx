/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../stores/userStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    userState: { name, update },
    userAction: { getUser },
  } = useContext(UserContext);
  useEffect(async () => {
    await getUser();
  }, []);

  if (name) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  if (update && !name) {
    return <Redirect to="/login" />;
  }
  return <div>hello</div>;
};

export default PrivateRoute;
