require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DBNAME } = process.env;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mongoUrl = `mongodb://`;
mongoUrl += `${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`Connecting to ${mongoUrl}`);
  })
  .catch(() => {
    console.log("Connect Error");
  });

app.use("/api", require("./routes/api"));

app.listen(80, () => {
  console.log("Port listen at 80");
});
