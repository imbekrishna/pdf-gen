const { Router } = require("express");
const {
  generatePdf,
  uploadController,
} = require("../controllers/pdf.controller.js");
const {
  fileInPath,
  validFilename,
} = require("../middlewares/file.middleware.js");
const { upload } = require("../configs/multer.config.js");

const pdfRouter = Router();

pdfRouter.post("/upload", upload.single("file"), fileInPath, uploadController);
pdfRouter.post("/generate", validFilename, generatePdf);

module.exports = pdfRouter;
