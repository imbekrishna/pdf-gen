const csv = require("fast-csv");
const fs = require("fs");
const { createPdf, createPage } = require("../services/createPdf.js");
const path = require("path");
const { getBasepathTo } = require("../utils/helpers.js");
const logger = require("../utils/logger.js");

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

  const doc = createPdf();
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${Date.now()}.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  fs.createReadStream(path.join(basePath, filename))
    .pipe(csv.parse({ headers: true }))
    .on("data", (row) => {
      doc.addPage();
      createPage(doc, row.Name, row.Percentage, row.Grade);
    })
    .on("end", () => {
      doc.end();
      fs.unlinkSync(path.join(basePath, filename));
    })
    .on("error", (error) => {
      logger.error(error);
      res.status(500).send(error.message);
    });
}

module.exports = { generatePdf, uploadController };
