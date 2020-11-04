import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import loginAPI from '../apis/user';

const initialState = {
  name: undefined,
  image: undefined,
};

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USER = 'GET_USER';

const userReducer = async (state, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const result = await loginAPI();
      console.log(result);
      return state;
    }
    case LOGOUT_USER: {
      return state;
    }
    case GET_USER: {
      return state;
    }
    default: {
      return state;
    }
  }
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const userAction = {
    loginUser: () => {
      dispatch({ type: LOGIN_USER });
    },
    logoutUser: () => {
      dispatch({ type: LOGOUT_USER });
    },
    getUser: () => {
      dispatch({ type: GET_USER });
    },
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <UserContext.Provider value={{ userState, userAction }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export { UserContext, UserProvider };

// 예시
// import React, { useContext } from 'react';
// import { UserContext } from '../store/userStore';
// const {
//   userState: { name },
// } = useContext(UserContext);
