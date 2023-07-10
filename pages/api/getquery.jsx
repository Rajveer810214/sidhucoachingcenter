import Query from '../../models/Query';
import fetchUserMiddleware from '../../middleware/fetchUser';

const getquery = async (req, res) => {
  try {
    const allQueries = await Query.find({ user: req.user.id });

    res.status(200).json({ success: allQueries });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Internal server error occurred' });
  }
};

export default fetchUserMiddleware(getquery);
