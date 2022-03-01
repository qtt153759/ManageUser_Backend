import { some } from "bluebird";
import db from "../models/index";

// create the connection, specify bluebird as Promise

const createRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({ attributes: ["url", "description"], raw: true });
        const persits = roles.filter(
            ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
        );
        if (persits.length === 0) {
            return {
                EM: "Nothing to create ...",
                EC: 1,
                DT: [],
            };
        }
        await db.Role.bulkCreate(persits);
        return {
            EM: `Create ${persits.length} role succeeds...`,
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong from server...",
            EC: -1,
            DT: [],
        };
    }
};
const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll();
        return {
            EM: `Get all role succeed...`,
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong from server...",
            EC: -1,
            DT: [],
        };
    }
};
const deleteRole = async (id) => {
    try {
        await db.Role.destroy({
            where: { id },
        });
        return {
            EM: `Get all role succeed...`,
            EC: 0,
            DT: "",
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong from server...",
            EC: -1,
            DT: "",
        };
    }
};
module.exports = {
    createRole,
    deleteRole,
    getAllRoles,
};
