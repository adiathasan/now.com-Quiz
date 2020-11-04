import React, { createContext, useReducer, useContext } from 'react';
import * as types from '../constants/userConstants';

// initialized global store

export const QuizContext = createContext();

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case types.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

// const getTokenFromLocalStorage = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user'))
//   : null;

const QuizContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  return (
    <QuizContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContextProvider);

export default QuizContextProvider;
