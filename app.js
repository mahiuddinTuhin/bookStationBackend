const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// routes
const booksRoute = require("./routes/books/books.routes");

app.use(express.json());
app.use(cors());

app.use("/api/v1/book", booksRoute);

app.get("/", (req, res, next) => {
  res.send("Server is working fine.");
});

module.exports = app;
