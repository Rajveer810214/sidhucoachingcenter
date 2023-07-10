// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

const jwttoken = 'Rajveer$idhu';

const fetchUserMiddleware = (handler) => async (req, res) => {
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(400).json({ error: 'Please provide a valid token' });
  }

  try {
    const decoded = jwt.verify(token, jwttoken);
    req.user = decoded.user;

    return await handler(req, res);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

export default fetchUserMiddleware;
