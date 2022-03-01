import roleService from "../service/roleService";
const readFunction = async (req, res) => {
    try {
        let data = await roleService.getAllRoles();
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
        let data = await roleService.createRole(req.body);
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
// const updateFunction = async (req, res) => {
//     try {
//         let data = await userApiService.updateUser(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             EM: "error from server",
//             EC: "-1",
//             DT: "",
//         });
//     }
// };
const deleteFunction = async (req, res) => {
    try {
        let { id } = req.body;
        // console.log(req.body);
        let data = await roleService.deleteRole(id);
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
    // updateFunction,
    deleteFunction,
};
