const express = require("express");
const cors = require("cors");
const pdfRouter = require("../routers/pdf.router.js");
const { errorHandler } = require("../middlewares/error.middleware.js");
const { requestLogger } = require("../utils/logger.js");

const app = express();
app.use(cors());

app.use(express.json());
app.use(requestLogger);
app.use("/pdf", pdfRouter);

app.use(errorHandler);

module.exports = app;
