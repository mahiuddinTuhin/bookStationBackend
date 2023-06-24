const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const express = require("express");
const router = express.Router();
const app = require("./app");

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection is successfull`);
});

app.listen(port, () => {
  console.log(`Server is running well in ${port}`);
});
