import db from "../models";
const getGroupList = async () => {
    try {
        let data = await db.Group.findAll({
            order: [["name", "ASC"]],
        });
        return {
            EM: "Get groups success",
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getGroupList,
};
