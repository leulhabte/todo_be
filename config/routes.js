const user = require("../app/routes/user");
const todo = require("../app/routes/todo");

module.exports = (app, passport) => {
  // authorization
  const authorizationMiddleware = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, message) => {
      if (err || !user.id) {
        if (Object.keys(message).length)
          return res.status(401).json({ message });
        else
          return res
            .status(401)
            .json({ message: "No user found with this token" });
      } else {
        req.id = user.id;
        return next();
      }
    })(req, res, next);
  };

  app.use("/api/user", user);
  app.use("/api/todo", authorizationMiddleware, todo);

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).send({ error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).send({
      url: req.originalUrl,
      error: "Not found",
    });
  });
};
