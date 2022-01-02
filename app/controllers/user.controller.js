const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const Users = require("../../models").User;
const { generateToken } = require("../utils");

const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const emailExist = await Users.findOne({ where: { email } });

  if (emailExist)
    return res.status(400).send("user with this email alreadys exists");

  const userDetails = await Users.build({
    id: uuidv4(),
    name,
    email,
    password: hash,
  });

  await userDetails.save();

  if (!userDetails) {
    return res.status(200).send({
      status: 404,
      message: "No data found",
    });
  }
  return res.status(201).send({
    userDetails,
  });
};

const loginUserController = async (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, message) => {
    if (err) return res.status(500).json({ message: err });
    else if (user) {
      req.logIn(user, async (err) => {
        if (err) return res.status(500).json({ message: err });
        else {
          const token = generateToken(user);
          return res.status(200).json({ user, token });
        }
      });
    } else return res.status(400).json({ message });
  })(req, res);
};
module.exports = { createUserController, loginUserController };
