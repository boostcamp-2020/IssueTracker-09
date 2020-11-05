import React from 'react';
import { Button, Div, Image } from './styled';
import config from '../../config';

const Login = () => {
  const loginHandler = () => {
    window.location.href = config.CALLBACK_URL;
  };

  return (
    <Div>
      <Image width="200px" height="200px" />
      <Button width="250px" height="50px" onClick={loginHandler}>
        Sign in with GitHub
      </Button>
    </Div>
  );
};

export default Login;
