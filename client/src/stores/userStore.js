import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { loginAPI, getUserAPI } from '../apis/user';

const initialState = {
  name: undefined,
  image: undefined,
  update: false,
};

export const LOGIN_USER = 'LOGIN_USER';
export const REAL_LOGIN = 'REAL_LOGIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USER = 'GET_USER';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      if (action.result) {
        return {
          name: action.result.name,
          image: action.result.image,
          update: false,
        };
      }
      return state;
    }
    case LOGOUT_USER: {
      return state;
    }
    case GET_USER: {
      if (!action.result) {
        return { update: true };
      }
      return {
        name: action.result.name,
        image: action.result.image,
        update: true,
      };
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
    loginUser: async (code) => {
      const result = await loginAPI(code);
      dispatch({ type: LOGIN_USER, result });
    },
    logoutUser: () => {
      dispatch({ type: LOGOUT_USER });
    },
    getUser: async () => {
      const result = await getUserAPI();
      dispatch({ type: GET_USER, result });
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
