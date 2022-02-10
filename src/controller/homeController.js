import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
    return res.render("home.pug", { name: "qtt" });
};
const handleUserPage = (req, res) => {
    return res.render("user.pug");
};
const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;
    userService.createNewUser(email, password, username);
    return res.send("alo");
};
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
};
