const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT);
  return token;
};

module.exports = { generateToken };
