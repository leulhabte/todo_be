const app = require("express")();
require("dotenv").config();
const passport = require("passport");

require("./config/passport")(passport);
require("./config/express")(app, passport);
require("./config/routes")(app, passport);

app.listen(3000, () => console.log("server started..."));
