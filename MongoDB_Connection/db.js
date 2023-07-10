// eslint-disable-next-line import/no-import-module-exports
import mongoose from 'mongoose';

require('dotenv').config();

async function db() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('connect to mongodb');
  } catch (error) {
    console.log(error);
  }
}
module.exports = db;
