import db from "../models/index";
import { hashUserPassword, checkEmailExist, checkPhoneExist } from "./loginRegisterService";
const getAllUser = async () => {
    let data = { EM: "", EC: "", DT: "" };
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
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
            attributes: ["id", "username", "email", "phone", "address", "sex"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [["id", "DESC"]],
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
const createUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist) {
            return {
                EM: "The email is already exist",
                EC: 1,
            };
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist) {
            return {
                EM: "The phone is already exist",
                EC: 1,
            };
        }
        let hashPassword = hashUserPassword(data.password);
        await db.User.create({
            ...data,
            password: hashPassword,
        });
        return {
            EM: "Create new user success",
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
const updateUser = async (data) => {
    try {
        const { id, address, username, groupId, sex } = data;
        if (!id || !username || !groupId || !sex) {
            return {
                EM: "Missing parameter",
                EC: 2,
                DT: "",
            };
        }
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (!user) {
            return {
                EM: "Not found",
                EC: 1,
                DT: [],
            };
        }
        await user.update({
            username: username,
            address: address,
            groupId: +groupId,
            sex: sex,
        });
        return {
            EM: "Edit user success",
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
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id },
        });
        if (!user) {
            return {
                EM: "Not found user",
                EC: 2,
                DT: "",
            };
        }
        await user.destroy();
        return {
            EM: "Delete success",
            EC: 0,
            DT: "",
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong from database ",
            EC: 1,
            DT: "",
        };
    }
};
module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
};
