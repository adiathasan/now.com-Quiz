import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './login.module.css';
import { Button, TextField } from '@material-ui/core';
import Head from 'next/head';
import useAuth from '../../hooks/useAuth';
import Message from '../../components/message/Message.jsx';
import { useQuizContext } from '../../hooks/quizContext';

const index = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [alertMessage, setAlertMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const router = useRouter();

  const { user } = useQuizContext();

  const [LoginUser, LogoutUser] = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email === '' || password === '') {
      setAlertMessage(`Oops! email or password is empty`);
      setMessageType('error');
      setTimeout(() => {
        setAlertMessage(null);
      }, 6000);
    } else {
      LoginUser({ email, password });
    }
  };

  const doesRedirectExists = router.query.redirect;

  const redirect = doesRedirectExists ? router.query.redirect : '/order';

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [LogoutUser, user]);

  return (
    <>
      <Head>
        <title>Now Quiz | Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.login}>
        <form
          className={styles.login__form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            className={styles.login__input}
            label="Email"
            required
            variant="outlined"
            color="primary"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TextField
            className={styles.login__input}
            label="Password"
            required
            variant="outlined"
            color="primary"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button fullWidth variant="contained" color="primary" type="submit">
            submit
          </Button>
          {alertMessage && (
            <Message message={alertMessage} type={messageType} />
          )}
        </form>
      </div>
    </>
  );
};

index.ge;

export default index;
