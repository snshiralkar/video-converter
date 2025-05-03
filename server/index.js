const express = require("express");
const cors = require("cors");
const multer = require("multer");
const hbjs = require("handbrake-js");
const path = require("path");
const app = express();
app.listen(3001);
app.use(cors());

const storage = multer.diskStorage({
  destination: "video/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// video is uploaded here in video folder
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("hi welcome");
});

app.post("/convert", upload.single("video"), (req, res) => {
  const input = path.join(req.file.destination, req.file.filename);
  const format = req.body.format;
  const output = "output/" + Date.now() + format;
  hbjs
    .spawn({ input: input, output: output })
    .on("error", (err) => {
      console.log("failed to convert", err);
    })
    .on("progress", (progress) => {
      console.log(progress.percentComplete);
    });
});
