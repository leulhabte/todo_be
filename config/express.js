const express = require("express");
const pkg = require("../package.json");
const session = require("express-session");
module.exports = (app, passport) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    session({
      secret: pkg.name,
      resave: false,
      saveUninitialized: true,
      //   store: new Red,
    })
  );
  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());
};
