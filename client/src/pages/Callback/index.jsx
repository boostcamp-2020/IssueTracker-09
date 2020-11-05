/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';
import { UserContext } from '../../stores/userStore';

const Callback = ({ history, location }) => {
  const {
    userState,
    userAction: { loginUser, realLogin },
  } = useContext(UserContext);

  // useEffect(() => {
  //   async function getToken() {
  //     const { code } = qs.parse(location.search, {
  //       ignoreQueryPrefix: true,
  //     });

  //     return history.push('/');
  //   }
  //   getToken();
  // }, [location, history]);

  useEffect(async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    await loginUser(code);
  }, []);

  // try {
  //   if (!userState.name) {
  //     userState.then((result) => {
  //       realLogin(result);
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  return <div>hello</div>;
};

export default Callback;
