import { instanceAxios } from '../config/axios';
import { LOADING_END, LOADING_START } from '../constants/loaderConstants';
import { ORDER_SUCCESS } from '../constants/orderConstants';
import { useQuizContext } from './quizContext';

const useOrder = () => {
  // hooks

  const { user, dispatch } = useQuizContext();

  // client --> server --> database
  //          client <-- server <--

  const submitOrder = async (order) => {
    dispatch({ type: LOADING_START });

    const config = {
      headers: {
        'Content-type': 'aplication/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      const { data } = await instanceAxios.post('/order', order, config);
      dispatch({ type: ORDER_SUCCESS, payload: data });
      dispatch({ type: LOADING_END });
    } catch (error) {
      dispatch({ type: ORDER_SUCCESS, payload: error });
      dispatch({ type: LOADING_END });
    }
  };

  return [submitOrder];
};

export default useOrder;
