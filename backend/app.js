// backend/app.js
const debug = require("debug");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const csurf = require("csurf");

// ADD THESE TWO LINES
const cors = require("cors");
const { isProduction } = require("./config/keys");

require("./models/User.js");
require("./models/Grief.js");
require("./models/Union.js");
require("./config/passport"); // <-- ADD THIS LINE

const passport = require("passport"); // <-- ADD THIS LINE
const usersRouter = require("./routes/api/users");
const griefsRouter = require("./routes/api/griefs");
const csrfRouter = require("./routes/api/csrf");
const unionRouter = require("./routes/api/unions");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/main.*.hot-update.json", (req, res) => {
  proxy.web(req, res);
});

// ADD THIS SECURITY MIDDLEWARE
// Security Middleware

if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, the Express
  // server will serve the React files statically.)
  app.use(passport.initialize()); // maybe inside if??
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// Attach Express routers
app.use("/api/users", usersRouter);
app.use("/api/griefs", griefsRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/unions", unionRouter);

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

module.exports = app;
