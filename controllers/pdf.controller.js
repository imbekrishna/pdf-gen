const fs = require("fs");
const XLSX = require("xlsx");
const { createPdf, createPage } = require("../services/createPdf.js");
const path = require("path");
const { getBasepathTo } = require("../utils/helpers.js");

const basePath = getBasepathTo("uploads");

/**
 * Controller function that handles upload and returns
 * filename to the client
 * @type {ControllerFunction}
 */
function uploadController(req, res) {
  res
    .status(200)
    .json({ message: "File uploaded", filename: req.file.filename });
}

/**
 * Controller to generate pdf files from file saved in memory
 * after uploading.
 * @type {ControllerFunction}
 */
function generatePdf(req, res) {
  const { filename } = req.body;
  const filePath = path.join(basePath, filename);
  const fileExt = path.extname(filePath).toLowerCase();

  let data = [];
  if (fileExt === ".csv") {
    const wb = XLSX.readFile(filePath, { type: "binary", raw: true });
    const sheet = wb.SheetNames[0];
    data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
  } else {
    const wb = XLSX.readFile(filePath);
    const sheet = wb.SheetNames[0];
    data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
  }

  const doc = createPdf();
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${Date.now()}.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  data.forEach((row) => {
    doc.addPage();
    createPage(doc, row.Name, row.Percentage, row.Grade);
  });

  doc.end();
  fs.unlinkSync(filePath);
}

module.exports = { generatePdf, uploadController };
