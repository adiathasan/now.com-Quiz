import { useEffect, useState } from 'react';
import { nth, head } from 'lodash';
import useLoading from '../../hooks/useLoading';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import { useRouter } from 'next/router';
import Header from '../../components/header/Header';
const index = () => {
  // hooks

  const [_, setIsLoading] = useLoading();
  const [user] = useAuth();
  const [__, submitOrder, errorOrder] = useOrder();

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

  // submit

  const handleSubmitCleanedData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    submitOrder({
      name,
      phone,
      address,
      amount,
      message,
    });
  };

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
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          id="mian"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit">Auto Fill</button>
      </form>
      <form onSubmit={handleSubmitCleanedData}>
        <div>
          <input
            type="text"
            value={name}
            placeholder="name here"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={phone}
            placeholder="phone here"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={address}
            placeholder="address here"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={amount}
            placeholder="amount here"
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={message}
            placeholder="message here"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
          </div>
        </div>
        <button type="submit" className="btn-block">
          Submit
        </button>
      </form>
    </div>
  );
};

export default index;
