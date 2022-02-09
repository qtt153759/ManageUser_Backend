import pug from "pug";
const handleHelloWorld = (req, res) => {
    return res.render("home.pug", { name: "qtt" });
};
module.exports = {
    handleHelloWorld,
};
