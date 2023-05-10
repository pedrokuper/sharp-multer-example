const express = require("express");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("avatar"), async (req, res) => {
  const { filename: image } = req.file;

  await sharp(req.file.path)
    .resize(1800)
    .jpeg({ mozjpeg: true })
    .toFile("./uploads/resized" + (req.file.destination, "resized", image));
  // fs.unlinkSync(req.file.path);

  res.send("ok");
});

app.listen(3000);
