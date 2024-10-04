const {
  createUserController,
  getAllUsersController,
  getUserByNameController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require("../controller/usersController");
const Joi = require("joi");


//UTILIZANDO JOI PARA LA VALIDACION DE DATOS
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string().pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/).required(),
  role: Joi.string().valid('admin','user').required(),

});

const getAllUsersHandler = (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = getUserByNameController(name);
      res.status(200).send(response);
    } else {
      const response = getAllUsersController();
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const getOneHandler = (req, res) => {
  try {
    const { id } = req.params;
    const response = getUserByIdController(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const createUserHandler = (req, res) => {
  try {
    const {error} = userSchema.validate(req.body);
    if (error) res.status(404).send(error.details[0].message);
    const { name, username, email, password, role} = req.body;
    const response = createUserController(name, username, email, password, role);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const updateUserHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email } = req.body;
    const response = updateUserController(id, name, username, email);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const deleteUserHandler = (req, res) => {
  try {
    const { id } = req.params;
    const response = deleteUserController(id);
  } catch (error) {}
};

module.exports = {
  getAllUsersHandler,
  getOneHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
