const bcrypt = require("bcryptjs");
const users = require("../db/dataBase");

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
  } else {
    return { message: "Inicio de sesion exitoso", user };
  }
};

module.exports = {
  registerController,
  loginController,
};
