import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getListAPI } from '../apis/issue';

const initialState = {
  search: undefined,
  list: [],
};

export const GET_LIST = 'GET_LIST';

const IssueReducer = (state, action) => {
  switch (action.type) {
    case GET_LIST: {
      if (action.issues) {
        return {
          list: action.issues,
          search: action.search,
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

const IssueContext = createContext();

const IssueProvider = ({ children }) => {
  const [issueState, dispatch] = useReducer(IssueReducer, initialState);

  const issueAction = {
    getList: async (search, flag = false) => {
      if (issueState.search !== search || flag) {
        const { issues } = await getListAPI(search);
        dispatch({ type: GET_LIST, issues, search });
      }
    },
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <IssueContext.Provider value={{ issueState, issueAction }}>
      {children}
    </IssueContext.Provider>
  );
};

IssueProvider.propTypes = {
  children: PropTypes.node,
};

export { IssueContext, IssueProvider };
