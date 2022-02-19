import userApiService from "../service/userApiService";
const readFunction = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;
        let data = {};
        if (page && limit) {
            data = await userApiService.getUserWithPagination(page, limit);
        } else {
            // get all
            data = await userApiService.getAllUser();
        }
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
const createFunction = async (req, res) => {
    try {
        let data = await userApiService.createFunction(req.body);
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
const updateFunction = async () => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.stauts(200).json({
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
const deleteFunction = async (req, res) => {
    try {
        let { id } = req.body;
        let data = await userApiService.deleteUser(id);
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
    readFunction,
    createFunction,
    updateFunction,
    deleteFunction,
};
