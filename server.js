import express from "express";
import session from "express-session";

import App from "./src/routes/index.js";
import CustomError from "./src/helper/CustomError.js";
import { PORT, SESSION_SECRET } from "./src/config/index.js";
import globalErrorHandler from "./src/controller/errorController.js";

// connecting to mongodb
import connectToMongoDB from "./src/config/init-mongodb.js";
connectToMongoDB();

const server = express();

// Middleware

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Init session
server.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secret: true,
      httpOnly: true,
    },
  })
);

// routes
server.use(App);

// catch 404 and forward to error handler
server.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Error Handler
server.use(globalErrorHandler);

const port = PORT || 5005;
server.listen(
  port,
  console.log(`server is listening on "http://localhost:${port}"`)
);
