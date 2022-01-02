const local = require("./passport/local");
const jwt = require("./passport/jwt");
const User = require("../models").User;

module.exports = function (passport) {
  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findOne({ where: { id } }, done));

  // use these strategies
  passport.use(local);
  passport.use(jwt);
};
