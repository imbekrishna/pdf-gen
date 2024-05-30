const path = require("path");

function getBasepathTo(directory) {
  const basePath = path.resolve(__dirname, "..", directory);

  return basePath;
}

module.exports = { getBasepathTo };
