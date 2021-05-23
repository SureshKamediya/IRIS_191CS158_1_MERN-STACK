const mongoose = require('mongoose');
const mongourl = "mongodb://localhost:27017/imsfc";


const connectDB = async () => {
    try {
      await mongoose.connect(
        mongourl,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      console.log('MongoDB is Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

  module.exports = connectDB;