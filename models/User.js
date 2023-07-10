import mongoose from 'mongoose';
import db from '../MongoDB_Connection/db';

db();

const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the index on the email field
nameSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model('User', nameSchema);
