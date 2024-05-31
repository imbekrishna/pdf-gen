const express = require("express");
const cors = require("cors");
const pdfRouter = require("../routers/pdf.router.js");
const path = require("path");
const { errorHandler } = require("../middlewares/error.middleware.js");
const { requestLogger } = require("../utils/logger.js");
const { getBasepathTo } = require("../utils/helpers.js");
getBasepathTo("dist");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.static(getBasepathTo("dist")));

app.use(express.json());
app.use(requestLogger);
app.use("/pdf", pdfRouter);

app.get("*", async (request, response) => {
  response.sendFile(path.resolve("dist/index.html"));
});

app.use(errorHandler);

module.exports = app;
