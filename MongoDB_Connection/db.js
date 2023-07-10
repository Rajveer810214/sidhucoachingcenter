const mongoose = require('mongoose');
// require('dotenv').config();

async function db() {
  await mongoose.connect(process.env.DATABASE);
}
module.exports = db;
