const logger = require("../utils/logger");

/**
 * Global error handler
 * @type {ErrorhandlerFunction}
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "InvalidFileType") {
    return response.status(400).json({ message: error.message });
  }
  return response
    .status(500)
    .json({ message: "Something went wrong. Please try again" });
};

module.exports = { errorHandler };
