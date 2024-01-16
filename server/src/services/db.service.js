const dbConfig = require("../configs/db.config");
const mongoose = require("mongoose");
const db = mongoose.connection;

async function connectDB() {
  mongoose.set("strictQuery", true);
  mongoose.connect(dbConfig.uri);
  db.on("error", (error) => {
    console.log(error);
  });
  db.on("connected", () => {
    console.log("db connected");
  });
}

module.exports = {
  connectDB,
};
