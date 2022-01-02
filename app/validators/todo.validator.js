const JOI = require("joi");

const createTodoValidatorSchema = JOI.object({
  title: JOI.string().required(),
});

const createTodoValidator = (req, res, next) => {
  const { error } = createTodoValidatorSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error || "Bad input" });
  else return next();
};

module.exports = {
  createTodoValidator,
};
