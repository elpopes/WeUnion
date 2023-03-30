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
require("./models/Poll.js");
require("./config/passport"); // <-- ADD THIS LINE

const passport = require("passport"); // <-- ADD THIS LINE
const usersRouter = require("./routes/api/users");
const griefsRouter = require("./routes/api/griefs");
const csrfRouter = require("./routes/api/csrf");
const unionsRouter = require("./routes/api/unions");
const pollsRouter = require("./routes/api/polls");
const inviteRouter = require("./routes/api/invite");
const unionMembers = require("./routes/api/unionMembers");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use("/main.*.hot-update.json", (req, res) => {
//   proxy.web(req, res);
// });

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
app.use("/api/polls", pollsRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/unions", unionsRouter);
app.use("/api/invite", inviteRouter);
app.use("/api/unionMembers", unionMembers);

/// Added for Render Deploy:
if (isProduction) {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  app.get("/", (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

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
