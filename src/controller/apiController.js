import loginRegisterService from "../service/loginRegisterService";
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "1",
                DT: "",
            });
        }
        if (req.body.password.length < 4) {
            return res.status(500).json({
                EM: "Your password must have more than 3 letters",
                EC: "1",
                DT: "",
            });
        }
        let data = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const handleLogin = async (req, res) => {
    try {
        if (!req.body.valueLogin || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "1",
                DT: "",
            });
        }
        let data = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};
module.exports = {
    handleRegister,
    handleLogin,
};
