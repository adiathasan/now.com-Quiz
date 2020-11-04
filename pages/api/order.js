export default ({ body, headers }, res) => {
  const token = headers.authorization.split(' ')[1];

  // also to check if user has certain permission or not

  if (token !== 'undefined') {
    res.statusCode = 200;
    res.json({ result: JSON.parse(body) });
  } else {
    res.json({ result: 'Not Authorized' });
  }
};
