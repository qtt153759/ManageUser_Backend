import mysql from "mysql2";
const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3308",
    user: "qtt153759",
    password: "truong157359",
    database: "jwt",
});

const handleHelloWorld = (req, res) => {
    return res.render("home.pug", { name: "qtt" });
};
const handleUserPage = (req, res) => {
    return res.render("user.pug");
};
const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;
    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?,?,?)",
        [email, password, username],
        function (err, results, fields) {
            if (err) console.log(err);
            console.log(results); // results contains rows returned by server
        }
    );
    return res.send("alo");
};
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
};
