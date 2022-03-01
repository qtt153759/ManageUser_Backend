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
const getRolesWithGroup = async (groupId) => {
    let roles = await db.Group.findOne({
        where: { id: groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            // relation n-n qua bảng group_role sẽ lấ hết attributes-> thừa -> through{attributes:ơ}
            through: { attributes: [] },
        },
    });
    return {
        EM: "Get Role by group id succeed...",
        EC: 0,
        DT: roles.get({ plain: true }),
    };
};
const assignToGroup = async (data) => {
    await db.Group_Role.destroy({ where: { groupId: +data.groupId } });
    await db.Group_Role.bulkCreate(data.listRoles);
    return {
        EM: "assign Role by group id succeed...",
        EC: 0,
        DT: [],
    };
};
module.exports = {
    getGroupList,
    assignToGroup,
    getRolesWithGroup,
};
