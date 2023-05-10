const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const port = 3000;
const app = express();
const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     console.log("🚀 ~ file: index.js:22 ~ file:", req.files);

//     const compressedFile = sharp(file.buffer)
//       .jpeg({ quality: 70 })
//       .resize(1280);

//     cb(null, file.fieldname + "-" + Date.now() + ".png");
//   }
// });
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", upload.single("avatar"), async (req, res, next) => {
  console.log(req.file.buffer);
  const path = `./uploads/${Date.now() + req.file.originalname}`;
  await sharp(req.file.buffer)
    .jpeg({ mozjpeg: true })
    .resize(1800)
    .toFile(path);

  res.send("Subido");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
