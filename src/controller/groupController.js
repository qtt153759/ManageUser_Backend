import groupService from "../service/groupService";
const getGroupList = async (req, res) => {
    try {
        let data = await groupService.getGroupList();
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
module.exports = {
    getGroupList,
};
