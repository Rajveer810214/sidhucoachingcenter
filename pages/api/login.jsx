// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
// eslint-disable-next-line consistent-return
import User from '../../models/User';

// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const jwttoken = 'Rajveer$idhu';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);

      if (passwordCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const success = true;
        const authToken = jwt.sign(data, jwttoken);
        return res.status(200).json({ success, authToken });
      }
      res.status(400).json({ error: 'Internal Server Error' });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
