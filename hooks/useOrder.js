import { useState } from 'react';
import { instanceAxios } from '../config/axios';
import useAuth from './useAuth';
import useLoading from './useLoading';

const useOrder = () => {
  // hooks

  const [user] = useAuth();
  const [_, setIsLoading] = useLoading();

  const [order, setOrder] = useState({});
  const [errorOrder, setErrorOrder] = useState('');

  // client --> server --> database
  //          client <-- server <--

  const submitOrder = async (order) => {
    setIsLoading(true);
    const config = {
      headers: {
        'Content-type': 'aplication/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      const { data } = await instanceAxios.post('/order', order, config);
      console.log(data);
      setOrder(data);
      setIsLoading(false);
    } catch (error) {
      setErrorOrder(error);
      setIsLoading(false);
    }
  };

  return [order, submitOrder, errorOrder];
};

export default useOrder;
