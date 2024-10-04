const users = require('../db/dataBase');
const bcrypt = require('bcryptjs');

const createUserController = (name, username, email) => {
    const id = users.length + 1
    const hashPassword = bcrypt.hash(password, 10)
    const newUser = { id, name, username, email };
    if (!name || !username || !email) throw new Error("Faltan datos");
    users.push(newUser);
    return newUser;

};

const getAllUsersController = () => {
    if (!user.length) throw new Error("No se encontraron usuarios");
    return users
};

const getUserByNameController = (name) => {
    const usersByName = users.filter(user => user.name === name);
    return usersByName;

}

const getUserByIdController = (id) => {
    const userById = users.find(user => user.id === Number(id));
    return userById;
}

const updateUserController = (id, name, username, email) => {
    const userById = users.find(user => user.id === Number(id));
    const newUser = { name, username, email };
    if (userById) {
        Object.assign(userById, newUser)
    };
    return userById;
};

const deleteUserController = (id) => {
    const index = users.findIndex((user) => user.id === Number(id));
    let deleteUser = null;
    if (index !== -1) {
        [deleteUser] = users.splice(index, 1);
    return deleteUser;
    };

};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByNameController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
}