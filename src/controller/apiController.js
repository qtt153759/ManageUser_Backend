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
        if (data && data.DT && data.DT.access_token) {
            //everytime login=>set cookie, httpOnly to avoid crawl cookie from client
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt"); //ko thể clear cookie từ frontend vì httpOnly: true => clear từ server
        return res.status(200).json({
            EM: "Clear cookies done!",
            EC: 0,
            DT: "",
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: "OK",
        EC: 0,
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username,
        },
    });
};
module.exports = {
    getUserAccount,
    handleRegister,
    handleLogout,
    handleLogin,
};
