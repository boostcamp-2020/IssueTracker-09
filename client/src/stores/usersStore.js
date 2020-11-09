import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getUsersAPI } from '../apis/user';

const initialState = {
  users: [],
  update: false,
};

export const GET_USERS = 'GET_USERS';

const usersReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        update: true,
        users: action.result,
      };
    }
    default: {
      return state;
    }
  }
};

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [usersState, dispatch] = useReducer(usersReducer, initialState);

  const usersAction = {
    getUsers: async () => {
      if (!usersState.update) {
        const result = await getUsersAPI();
        dispatch({ type: GET_USERS, result: result.assignee });
      }
    },
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <UsersContext.Provider value={{ usersState, usersAction }}>
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node,
};

export { UsersContext, UsersProvider };
