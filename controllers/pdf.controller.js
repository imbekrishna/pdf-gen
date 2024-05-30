import csv from "fast-csv";
import fs from "fs";
import createPdf, { createPage } from "../services/createPdf.js";
import path from "path";
import { getBasepathTo } from "../utils/helpers.js";

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
    .on("end", (rowCount) => {
      doc.end();
      console.log(`Generated ${rowCount} certificates.`);
      fs.unlinkSync(path.join(basePath, filename));
    })
    .on("error", (error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
}

export { generatePdf, uploadController };
