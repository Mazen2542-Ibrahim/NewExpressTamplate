import express from "express";
import helmet from "helmet";

import asyncErrorHandler from "../helper/asyncErrorHandler.js";

const app = express();

app.use(helmet());

app.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
      status: "success",
      message: "Hello, World",
    });
  })
);

export default app;
