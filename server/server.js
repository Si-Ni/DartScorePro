const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const dartscounter = require("./src/routes/dartscounter.route");
const rateLimiter = require("./src/middlewares/rateLimit.middleware");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/services/db.service");
const app = express();
const PORT = 4000 || process.env.PORT;

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/", dartscounter);
app.use(cookieParser());
app.set("trust proxy", 1);
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
