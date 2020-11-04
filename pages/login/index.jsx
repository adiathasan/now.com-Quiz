import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/header/Header.jsx';

const index = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');

  const router = useRouter();

  const [user, LoginUser, LogoutUser, error] = useAuth();

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser({ email, password });
  };

  const doesRedirectExists = router.query.redirect;

  const redirect = doesRedirectExists ? router.query.redirect : '/';

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [LogoutUser, user]);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

index.ge;

export default index;
