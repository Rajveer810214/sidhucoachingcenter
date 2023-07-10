// eslint-disable-next-line import/extensions
import fetchUserMiddleware from '../../middleware/fetchUser';
import User from '../../models/User';

const handler = async (req, res) => {
  try {
    const success = true;
    // Access the fetched user from req.user
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    res.status(200).json({ success, user });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Internal server error occurred' });
  }
};

export default fetchUserMiddleware(handler);
