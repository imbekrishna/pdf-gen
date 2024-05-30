const multer = require("multer");
const path = require("path");

const allowedFileTypes = [".csv", ".xlsx", ".xls"];
const allowedMimeTypes = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  const extensionMatches = allowedFileTypes.includes(fileExtension);
  const mimetypeMatches = allowedMimeTypes.includes(mimetype);

  if (!mimetypeMatches || !extensionMatches) {
    return cb(
      {
        name: "InvalidFileTypeError",
        message: `Invalid file or file type (${file.mimetype})`,
      },
      false
    );
  }
  return cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

module.exports = { upload };
