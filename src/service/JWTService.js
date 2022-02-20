import db from "../models/index";
const getGroupWithRoles = async (user) => {
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            // relation n-n qua bảng group_role sẽ lấ hết attributes-> thừa -> through{attributes:ơ}
            through: { attributes: [] },
        },
    });
    return roles ? roles.get({ plain: true }) : {};
};
module.exports = {
    getGroupWithRoles,
};
