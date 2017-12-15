const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Hello world!");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`There will be dragons on port ${PORT}`);
});
