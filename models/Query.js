import mongoose from 'mongoose';
import db from '../MongoDB_Connection/db';

db();
const querySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Mark the user field as required
  },
  query: {
    type: String,
    required: true,
  },
});

const Query = mongoose.models.query || mongoose.model('query', querySchema);

export default Query;
