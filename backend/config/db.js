const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/new_db";
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
