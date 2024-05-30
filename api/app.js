import express from "express";
import cors from "cors";
import pdfRouter from "../routers/pdf.router.js";
import { errorHandler } from "../middlewares/error.middleware.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/pdf", pdfRouter);

app.use(errorHandler);

export default app;
