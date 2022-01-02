/**
 * Module dependencies.
 */

const Users = require("../../models").User;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

/**
 * Expose
 */

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    Users.findOne({ where: { email } }).then((user) => {
      if (!user) return done(null, false, { message: "Incorrect credential" });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        else if (isMatch) return done(null, user);
        else return done(null, false, { message: "Incorrect credential" });
      });
    });
  }
);
