import React, { useContext } from 'react';
import { UserContext } from '../../stores/userStore';
import { Button, Div, Image } from './styled';

const Login = () => {
  const {
    userAction: { loginUser },
  } = useContext(UserContext);
  return (
    <Div>
      <Image width="200px" height="200px" />
      <Button width="250px" height="50px" onClick={loginUser}>
        Sign in with GitHub
      </Button>
    </Div>
  );
};

export default Login;
