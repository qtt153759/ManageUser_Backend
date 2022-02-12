import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs", { name: "qtt" });
};
const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
};
const handleCreateNewUser = async (req, res) => {
    let { email, password, username } = req.body;
    await userService.createNewUser(email, password, username);
    return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
};
const getUpdateUserPage = async (req, res) => {
    let user = await userService.getUserDataById(req.params.id);
    let userData = {};
    if (user && user.length > 0) {
        userData = user[0];
    }
    return res.render("user-update.ejs", { userData });
};
const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;

    await userService.updateUserInfor(email, username, id);

    return res.redirect("/user");
};
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
};
