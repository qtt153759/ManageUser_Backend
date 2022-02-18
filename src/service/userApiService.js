import db from "../models/index";
const getAllUser = async () => {
    let data = { EM: "", EC: "", DT: "" };
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });
        if (users) {
            // let data = users.get({ plain: true });
            return {
                EM: "get data success",
                EC: 0,
                DT: users,
            };
        }
        return {
            EM: "get data success",
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: +offset,
            limit: +limit,
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        };
        return {
            EM: "get data success",
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};
const createFunction = async (data) => {
    try {
        await db.User.create(data);
    } catch (e) {
        console.log(e);
    }
};
const updateFunction = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            user.save({});
        } else {
            //not found
        }
    } catch (e) {
        console.log(e);
    }
};
const deleteFunction = async (id) => {
    try {
        await db.User.delete({
            where: { id: id },
        });
    } catch (e) {
        console.log(e);
    }
};
module.exports = {
    getAllUser,
    createFunction,
    updateFunction,
    deleteFunction,
    getUserWithPagination,
};
