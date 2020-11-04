import { sign } from 'jsonwebtoken';

// fake login ***https://reqres.in/api/login was not responding !

export default ({ body }, res) => {
  const { email, password } = JSON.parse(body);

  if (email.trim() === '' && password.trim() === '') {
    res.statusCode = 401;
    res.json({ error: 'Invalid email or password' });
  } else {
    const token = sign({ email }, 'MY_SECRET_KEY', { expiresIn: '10d' });
    res.statusCode = 200;
    res.json({ token });
  }
};
