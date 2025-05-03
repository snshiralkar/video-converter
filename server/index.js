const express = require("express");
const cors = require("cors");
const app = express();
app.listen(3001);

app.use(cors());

app.get("/", (req, res) => {
  res.send("hi welcome");
});
app.post("/convert", (req, res) => {
  res.send("hi");
});
