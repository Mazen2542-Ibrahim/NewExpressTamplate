import { NODE_ENV } from "../config/index.js";
import CustomError from "../helper/CustomError.js";

const devErrors = (res, err) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });
};

const prodErrors = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later",
    });
  }
};

const castErrorHandler = (err) => {
  const msg = `Invelid value for ${err.path}: ${err.value}`;
  return new CustomError(msg, 400);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (NODE_ENV === "development") {
    devErrors(res, err);
  } else if (NODE_ENV === "production") {
    if (err.name === "CastError") {
      err = castErrorHandler(err);
    }

    prodErrors(res, err);
  }
};

export default globalErrorHandler;
