const Joi = require("joi");
const {
  registerController,
  loginController,
} = require("../controller/authController");

//UTILIZANDO JOI PARA LA VALIDACION DE DATOS
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string()
    .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    .required(),
  role: Joi.string().valid("admin", "user"),
});

const registerHandler = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) res.status(404).send(error.details[0].message);
    const { name, username, email, password, role } = req.body;
    const response = await registerController(
      name,
      username,
      email,
      password,
      role
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const loginHandler = async(req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
