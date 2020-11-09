import React, { createContext, useReducer, useContext } from 'react';
import * as userTypes from '../constants/userConstants';
import * as loaderTypes from '../constants/loaderConstants';
import * as orderTypes from '../constants/orderConstants';

// initialized global store

export const QuizContext = createContext();

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    // user
    case userTypes.USER_LOGIN_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case userTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case userTypes.USER_LOGOUT_SUCCESS:
      localStorage.removeItem('userInfo');
      return {
        ...state,
        user: null,
      };
    // loader
    case loaderTypes.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case loaderTypes.LOADING_END:
      return {
        ...state,
        isLoading: false,
      };
    // order
    case orderTypes.ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };
    case orderTypes.ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case orderTypes.ORDER_RESET:
      return {
        ...state,
        order: {},
      };

    default:
      return state;
  }
};

// localstorage config

let getUserFromLocalStorage;
export const isServer = typeof window === 'undefined';

if (!isServer) {
  const isUserInLocalStorage = localStorage.getItem('userInfo');
  getUserFromLocalStorage = isUserInLocalStorage
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
}

// store provider

const QuizContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: getUserFromLocalStorage,
    isLoading: false,
    order: {},
  });

  return (
    <QuizContext.Provider
      value={{
        user: state.user,
        dispatch,
        isLoading: state.isLoading,
        order: state.order,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);

export default QuizContextProvider;
