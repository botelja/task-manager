const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGODB_URI || config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDb Connected.');
  } catch (error) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
