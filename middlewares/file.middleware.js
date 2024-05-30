const path = require("path");
const fs = require("fs");
const { getBasepathTo } = require("../utils/helpers.js");

const basepath = getBasepathTo("uploads");

/**
 * Middleware to check if file is present in the request
 * @type {MiddlewareFunction}
 */
function fileInPath(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: "No file was provided" });
  }
  next();
}

/**
 * Middleware to check if valid filename is in body
 * @type {MiddlewareFunction}
 */
function validFilename(req, res, next) {
  const { filename } = req.body;
  if (!filename) {
    return res.status(400).json({ message: "No filename was provided" });
  }
  if (!fs.existsSync(path.join(basepath, filename))) {
    return res.status(400).json({ message: "File doesn't exists." });
  }

  next();
}

module.exports = { fileInPath, validFilename };
