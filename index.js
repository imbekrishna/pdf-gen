const app = require("./api/app.js");
const logger = require("./utils/logger.js");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
