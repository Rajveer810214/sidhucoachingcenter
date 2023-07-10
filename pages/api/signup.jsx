// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import User from '../../models/User';

// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const jwttoken = 'Rajveer$idhu';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      const myPlaintextPassword = password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(myPlaintextPassword, salt);
      console.log(name, email, hash);

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      const user = new User({ name, email, password: hash });
      await user.save();
      const data = {
        user: {
          id: user.id,
        },
      };
      const success = true;
      const authToken = jwt.sign(data, jwttoken);
      return res.status(200).json({ success, authToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
