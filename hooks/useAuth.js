import { instanceAxios } from '../config/axios';
import { LOADING_END, LOADING_START } from '../constants/loaderConstants';
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from '../constants/userConstants';
import { useQuizContext } from './quizContext';

const useAuth = () => {
  const { dispatch } = useQuizContext();

  // login user

  const LoginUser = async (credentials) => {
    dispatch({ type: LOADING_START });
    try {
      const config = {
        headers: {
          'Content-type': 'aplication/json',
        },
      };
      const { data } = await instanceAxios.post('/login', credentials, config);
      dispatch({ type: LOADING_END });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: LOADING_END });
      dispatch({ type: USER_LOGIN_FAILURE, payload: err?.error });
    }
  };

  // logout user

  const LogoutUser = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS });
  };

  return [LoginUser, LogoutUser];
};

export default useAuth;
