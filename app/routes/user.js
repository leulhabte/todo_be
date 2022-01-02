const router = require("express").Router();
const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/user.validator");
const {
  createUserController,
  loginUserController,
} = require("../controllers/user.controller");

router.post("/create", createUserValidator, createUserController);
router.post("/login", loginUserValidator, loginUserController);

router.get("/", (req, res) => {
  return res.send("ok");
});

module.exports = router;
