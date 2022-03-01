import groupService from "../service/groupService";
const getGroupList = async (req, res) => {
    try {
        let data = await groupService.getGroupList(req.data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        console.log(e);
        return {
            EM: "Something wrong from database ",
            EC: 1,
            DT: "",
        };
    }
};
const getRolesWithGroup = async (req, res) => {
    try {
        let { id } = req.params;
        console.log("id ", id);
        let data = await groupService.getRolesWithGroup(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        console.log(e);
        return {
            EM: "Something wrong from database ",
            EC: 1,
            DT: "",
        };
    }
};
const assignToGroup = async (req, res) => {
    try {
        let data = await groupService.assignToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong from database ",
            EC: 1,
            DT: "",
        };
    }
};
module.exports = {
    getGroupList,
    getRolesWithGroup,
    assignToGroup,
};
