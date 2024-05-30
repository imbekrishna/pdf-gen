const app = require("./api/app.js");
const logger = require("./utils/logger.js");

app.listen(3001, () => {
  logger.info("server is running on port 3001");
});
