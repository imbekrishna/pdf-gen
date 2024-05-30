import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  generatePdf,
  uploadController,
} from "../controllers/pdf.controller.js";
import { fileInPath, validFilename } from "../middlewares/file.middleware.js";

const pdfRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}.csv`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /csv/;
  const extensionName = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = fileTypes.test(file.mimetype);

  if (!mimetype && !extensionName) {
    return cb(
      {
        name: "InvalidFileType",
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

pdfRouter.post("/upload", upload.single("file"), fileInPath, uploadController);
pdfRouter.post("/generate", validFilename, generatePdf);

export default pdfRouter;
