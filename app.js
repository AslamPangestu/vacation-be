import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import createError from "http-errors";

import { mongodbInit } from "infrastructure/db";
import indexRouter from "infrastructure/routes";
import usersRouter from "infrastructure/routes/users";
import adminRouter from "infrastructure/routes/admin";
import apiRouter from "infrastructure/routes/api";

const app = express();
mongodbInit();

// view engine setup
app.set("views", path.join(__dirname, "infrastructure/views"));
app.set("view engine", "ejs");

// plugins setup
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// assets setup
app.use("/public", express.static(path.join(__dirname, "storage")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

// route setup
app.use("/", indexRouter);
app.use("/users", usersRouter);
// admin
app.use("/admin", adminRouter);
app.use("/api/v1/member", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
