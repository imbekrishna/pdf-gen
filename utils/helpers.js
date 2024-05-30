const path = require("path");

function getBasepathTo(directory) {
  const basePath = path.resolve(__dirname, "..", directory);

  return basePath;
}

function validateRows(row, index) {
  const errors = [];
  if (!row.Name) errors.push(`Row ${index + 1}: Name is missing.`);
  if (!row.Percentage) errors.push(`Row ${index + 1}: Percentage is missing.`);
  if (!row.Grade) errors.push(`Row ${index + 1}: Grade is missing.`);
  return errors;
}

module.exports = { getBasepathTo, validateRows };
