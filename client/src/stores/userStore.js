import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { loginAPI, getUserAPI } from '../apis/user';

const initialState = {
  name: undefined,
  image: undefined,
};

export const LOGIN_USER = 'LOGIN_USER';
export const REAL_LOGIN = 'REAL_LOGIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USER = 'GET_USER';

const userReducer = async (state, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      if (action.result) {
        return {
          name: action.result.name,
          image: action.result.image,
        };
      }
      return state;
    }
    case REAL_LOGIN: {
      console.log(action);
      return {
        name: action.name,
        image: action.image,
      };
    }
    case LOGOUT_USER: {
      return state;
    }
    case GET_USER: {
      const result = getUserAPI();

      if (result) {
        return state;
      }
      return {
        name: result.name,
        image: result.image,
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
      console.log(userState);
    },
    logoutUser: () => {
      dispatch({ type: LOGOUT_USER });
    },
    getUser: () => {
      dispatch({ type: GET_USER });
    },
    realLogin: ({ name, image }) => {
      dispatch({ type: REAL_LOGIN, name, image });
      console.log(userState);
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
