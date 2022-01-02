const JOI = require('joi');

const createUserValidatorSchema = JOI.object({
    name: JOI.string().required(),
    email: JOI.string().email().required(),
    password: JOI.string().required()
})

const loginUserValidatorSchema = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().required()
})


const createUserValidator = (req, res, next)=>{
    const {error} = createUserValidatorSchema.validate(req.body)
    if (error)
    return res.status(400).json({ message: error || "Bad input" });
  else return next();
}

const loginUserValidator = (req, res, next)=>{
    const {error} = loginUserValidatorSchema.validate(req.body)
    if (error)
    return res.status(400).json({ message: error || "Bad input" });
  else return next();
}

module.exports={
    createUserValidator,
    loginUserValidator
}