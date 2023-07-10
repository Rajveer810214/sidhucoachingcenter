import Query from '../../models/Query';
import fetchUserMiddleware from '../../middleware/fetchUser';

const addQuestionHandler = async (req, res) => {
  try {
    const { user } = req; // Access the user object from the request

    const question = new Query({ user: user.id, query: req.body.askquery });

    await question.save();

    res.status(200).json({ success: 'mice' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Internal server error occurred' });
  }
};

export default fetchUserMiddleware(addQuestionHandler);
