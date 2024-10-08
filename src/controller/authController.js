const bcrypt = require("bcryptjs");
const users = require("../db/dataBase");
const jwt = require("jsonwebtoken");

const registerController = async (
  name,
  username,
  email,
  password,
  role = "user"
) => {
  const userExists = users.some((user) => user.email === email); // some tira un booleano para saber si ya existe ese email registrado
  if (userExists) {
    throw new Error("Usuario ya registrado"); //con este if chequeamos que el usuario no este registrado, si lo esta tira un error, sino sigue camino
  }
  const id = users.length + 1; //ESTO ES DE EJEMPLO PERO HABRA QUE CAMBIAR PORQ NO SE HACE ASI
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = { id, name, username, password: hashPassword, email, role };
  users.push(newUser);
  return newUser;
};

const loginController = async (email, password) => {
  const user = users.find((user) => user.email === email); // comparamos el email ingresado para ver si esta registrado
  if (!user) {
    throw new Error("Usuario no encontrado"); //si no esta registrado el usuario tira un error
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password); //comparamos la contraseña ingresada con la registrada
  if (!isPasswordMatch) {
    throw new Error("La contraseña introducida es incorrecta"); //si la clave es incorrecta, tira un error
  }
  // utilizamos Jsonwebtoken para generar un token segun el rol del usuario
  const token = jwt.sign({ id: user.id, role: user.role }, "my_secret_key", {
    expiresIn: "1h",
  }); //la palabra secreta no debe ir aca sino en el archivo ENV

  const { password: _, ...userWhitouthPassword } = user; //esto es para ocultar el password en el return para q sea mas seguro

  return {
    message: "Inicio de sesion exitoso",
    token,
    user: userWhitouthPassword,
  };
};

module.exports = {
  registerController,
  loginController,
};
