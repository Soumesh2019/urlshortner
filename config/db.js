const mongoose = require("mongoose");
const config = require("config");
const { urls } = require("./default");

const connectDb = async () => {
  try {
    await mongoose.connect(urls["mongoURI"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDb Connected.....");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
