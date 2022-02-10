import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs", { name: "qtt" });
};
const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    console.log(userList);
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
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
};
