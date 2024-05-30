import express from "express";
import path from "path";

import { fileURLToPath } from "url";

import pdfRouter from "../routers/pdf.router.js";
import { errorHandler } from "../middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "..", "view"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/pdf", pdfRouter);

app.use(errorHandler);

export default app;
