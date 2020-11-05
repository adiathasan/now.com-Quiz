import { useEffect, useState } from 'react';
import { nth, head } from 'lodash';
import { Button, Typography } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useOrder from '../../hooks/useOrder';
import styles from './order.module.css';
import Message from '../../components/message/Message.jsx';
import { useQuizContext } from '../../hooks/quizContext';
import { ORDER_RESET } from '../../constants/orderConstants';

const index = () => {
  // hooks

  const { user, order, error, dispatch } = useQuizContext();
  const [submitOrder] = useOrder();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push({ pathname: '/login', query: { redirect: 'order' } });
    }
  }, [user, router]);

  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    if (order.result) {
      setAlertMessage(`successfully Order Created for ${order.result.name}`);
      setMessageType('success');

      // reset field

      setInput('');
      setName('');
      setPhone('');
      setAddress('');
      setAmount('');
      setMessage('');

      setTimeout(() => {
        setAlertMessage(null);
        dispatch({ type: ORDER_RESET });
      }, 4000);
    }
  }, [order]);

  useEffect(() => {
    if (error) {
      setAlertMessage(errorOrder.result);
      setMessageType('error');
      setTimeout(() => {
        setAlertMessage(null);
      }, 6000);
    }
  }, [error]);

  // @auto fill func

  const handleSubmit = (e) => {
    e.preventDefault();

    const breakedInput = input.split(/\r|\n/);

    // cleanig the data

    let cleanedData = breakedInput.filter((inp) => inp !== '');

    const isInputLengthOk = cleanedData.length >= 5;
    const startPosFill = cleanedData.length + 1;
    const endPosFill = 5 - cleanedData.length;

    cleanedData = isInputLengthOk
      ? [...cleanedData]
      : [...cleanedData, ...Array(4).fill('', startPosFill, endPosFill)];

    const addressPositioning = cleanedData.length - 2;
    const cleanedAddress =
      cleanedData.slice(2, addressPositioning).join(' ') || '';

    // filling the cleaned data

    setName(head(cleanedData) || '');
    setPhone(nth(cleanedData, 1) || '');
    setAddress(cleanedAddress);
    setAmount(nth(cleanedData, -2) || '');
    setMessage(nth(cleanedData, -1) || '');
  };

  // submit order

  const handleSubmitCleanedData = async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    submitOrder({
      name,
      phone,
      address,
      amount,
      message,
    });
  };

  // swipe up

  const handleUp = (e) => {
    e.preventDefault();

    // location finding

    const currentInput = e.target.parentElement.parentElement.firstChild;

    const upperInput =
      e.target.parentElement.parentElement.previousSibling.firstChild;

    // swipe logic

    switch (upperInput.id) {
      case 'name':
        setName(currentInput.value);
        setPhone(upperInput.value);
        break;

      case 'phone':
        setPhone(currentInput.value);
        setAddress(upperInput.value);
        break;

      case 'address':
        setAddress(currentInput.value);
        setAmount(upperInput.value);
        break;

      case 'amount':
        setAmount(currentInput.value);
        setMessage(upperInput.value);
        break;

      default:
        break;
    }
  };

  // swipe down

  const handleDown = (e) => {
    e.preventDefault();

    // location finding

    const currentInput = e.target.parentElement.parentElement.firstChild;

    const lowerInput =
      e.target.parentElement.parentElement.nextSibling.firstChild;

    // swipe logic

    switch (lowerInput.id) {
      case 'phone':
        setPhone(currentInput.value);
        setName(lowerInput.value);
        break;

      case 'address':
        setAddress(currentInput.value);
        setPhone(lowerInput.value);
        break;

      case 'amount':
        setAmount(currentInput.value);
        setAddress(lowerInput.value);
        break;

      case 'message':
        setMessage(currentInput.value);
        setAmount(lowerInput.value);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Now Quiz | Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.order}>
        <form className={styles.order__textForm} onSubmit={handleSubmit}>
          <Typography variant="body1">Paste Your Order Here</Typography>
          <textarea
            required
            className={styles.order__textarea}
            name="text"
            id="mian"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <Button variant="contained" color="secondary" fullWidth type="submit">
            Auto Fill
          </Button>
        </form>
        <form
          className={styles.order__mainForm}
          onSubmit={handleSubmitCleanedData}
        >
          {alertMessage && (
            <Message message={alertMessage} type={messageType} />
          )}
          <Typography variant="body1">Swipe If You Need To</Typography>
          <div>
            <input
              required
              className={styles.order__input}
              type="text"
              value={name}
              placeholder="name..."
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="swipe">
              <button onClick={handleDown} className={styles.btn__down}>
                Down
              </button>
            </div>
          </div>
          <div>
            <input
              required
              className={styles.order__input}
              type="text"
              value={phone}
              placeholder="phone..."
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="swipe">
              <button onClick={handleUp} className={styles.btn__up}>
                up
              </button>
              <button onClick={handleDown} className={styles.btn__down}>
                Down
              </button>
            </div>
          </div>
          <div>
            <textarea
              required
              className={styles.order__input}
              type="text"
              value={address}
              placeholder="address..."
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="swipe">
              <button onClick={handleUp} className={styles.btn__up}>
                up
              </button>
              <button onClick={handleDown} className={styles.btn__down}>
                Down
              </button>
            </div>
          </div>
          <div>
            <input
              required
              className={styles.order__input}
              type="text"
              value={amount}
              placeholder="amount..."
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="swipe">
              <button onClick={handleUp} className={styles.btn__up}>
                up
              </button>
              <button onClick={handleDown} className={styles.btn__down}>
                Down
              </button>
            </div>
          </div>
          <div>
            <input
              required
              className={styles.order__input}
              type="text"
              value={message}
              placeholder="message..."
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="swipe">
              <button onClick={handleUp} className={styles.btn__up}>
                up
              </button>
            </div>
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className="btn-block"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default index;
