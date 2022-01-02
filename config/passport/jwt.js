const JWTStratagy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const User = require("../../models").User;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
};

module.exports = new JWTStratagy(options, (payload, done) => {
  const { id } = payload;
  console.log(payload);
  User.findByPk(id)
    .then((user) => {
      if (!user)
        return done(null, false, { message: "No user found with this token" });
      else {
        return done(null, { id });
      }
    })
    .catch((err) => done(null, false, { message: err }));
});
