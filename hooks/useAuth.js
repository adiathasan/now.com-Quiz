import { useState } from 'react';
import { instanceAxios } from '../config/axios';

const useAuth = () => {
  // localstorage config

  let getUserFromLocalStorage;
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    const isUserInLocalStorage = localStorage.getItem('userInfo');
    getUserFromLocalStorage = isUserInLocalStorage
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
  }

  //  local states

  const [user, setUser] = useState(getUserFromLocalStorage);
  const [error, setError] = useState('');

  // login user

  const LoginUser = async (credentials) => {
    try {
      const config = {
        headers: {
          'Content-type': 'aplication/json',
        },
      };
      const { data } = await instanceAxios.post('/login', credentials, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      setError(error);
    }
  };

  // logout user

  const LogoutUser = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return [user, LoginUser, LogoutUser, error];
};

export default useAuth;
