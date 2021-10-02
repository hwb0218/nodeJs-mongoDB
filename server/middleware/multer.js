const path = require("path");
const multer = require("multer");
const { createBrotliCompress } = require("zlib");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    callback(null, basename + "_" + Date.now() + extname);
  },
});

const fileFilter = (req, file, callback) => {
  const extname = path.extname(file.originalname).toLowerCase();

  if (extname !== ".jpg" && extname !== ".png") {
    callback(new Error("only jpg & png file supproted!"), false);
  }
  callback(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
