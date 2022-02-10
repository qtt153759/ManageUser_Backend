import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3308",
    user: "qtt153759",
    password: "truong157359",
    database: "jwt",
});
const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};
const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);
    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?,?,?)",
        [email, hashPass, username],
        function (err, results, fields) {
            if (err) console.log(err);
        }
    );
};

module.exports = {
    hashPassword,
    createNewUser,
};
