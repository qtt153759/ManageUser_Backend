import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
        });
    } catch (error) {
        console.log(error);
    }
};

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId },
    });
};

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id },
    });
    return user.get({ plain: true });
};

const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: { id: id },
        }
    );
};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};
