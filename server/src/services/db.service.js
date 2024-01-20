const mongoose = require("mongoose");
const dbConfig = require("../configs/db.config");

mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose
    .connect(dbConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.error("Error connecting to the db:", error.message);
      process.exit(1);
    });
};

mongoose.connection.on("error", (error) => {
  console.error("db connection error:", error);
  process.exit(1);
});

module.exports = { connectDB };
