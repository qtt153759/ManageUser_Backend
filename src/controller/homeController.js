import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs", { name: "qtt" });
};
const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    console.log(userList);
    return res.render("user.ejs", { userList });
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
