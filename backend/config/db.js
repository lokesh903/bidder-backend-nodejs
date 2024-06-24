const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/";

mongoose.set('strictQuery', false);
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodb = async () => {
  try {
    mongoose
      .connect(url, connectionParams)
      .then((data) => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
      });

  } catch (error) {
    console.error(error);
  }
};

module.exports = mongodb;
