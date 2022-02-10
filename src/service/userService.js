import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import mysql from "mysql2/promise";

// import mysql from "mysql2";
// const connection = mysql.createConnection({
//     host: "127.0.0.1",
//     port: "3308",
//     user: "qtt153759",
//     password: "truong157359",
//     database: "jwt",
// });
const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};
const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: "qtt153759",
        database: "jwt",
        password: "truong157359",
        port: "3308",
    });
    let hashPass = hashPassword(password);
    try {
        const [rows, fields] = await connection.execute(
            "INSERT INTO users (email, password, username) VALUES (?,?,?)",
            [email, hashPass, username]
        );
        return rows;
    } catch (e) {
        console.log(e);
    }
};
const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: "qtt153759",
        database: "jwt",
        password: "truong157359",
        port: "3308",
    });
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM users");
        return rows;
    } catch (e) {
        console.log(e);
    }
};
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: "qtt153759",
        database: "jwt",
        password: "truong157359",
        port: "3308",
    });
    try {
        const [rows, fields] = await connection.execute(
            "DELETE FROM users WHERE id=?",
            [id]
        );
        return rows;
    } catch (e) {
        console.log(e);
    }
};
module.exports = {
    hashPassword,
    createNewUser,
    getUserList,
    deleteUser,
};
