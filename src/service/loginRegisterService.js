import db from "../models/index";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import bcrypt from "bcryptjs";
import { createJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });
    if (user) {
        return true;
    }
    return false;
};
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone },
    });
    if (user) {
        console.log(user);
        return true;
    }
    return false;
};
const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist) {
            return {
                EM: "The email is already exist",
                EC: 1,
            };
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist) {
            return {
                EM: "The phone is already exist",
                EC: 1,
            };
        }
        let hashPassword = hashUserPassword(rawUserData.password);
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4,
        });
        return {
            EM: "A user is created successfully",
            EC: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs in service...",
            EC: 2,
        };
    }
};
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
            },
        });
        if (user && checkPassword(rawData.password, user.password)) {
            let groupWithRoles = await getGroupWithRoles(user);
            let payload = {
                email: user.email,
                username: user.username,
                groupWithRoles,
            };
            let token = createJWT(payload);
            return {
                EM: "ok!",
                EC: 0,
                DT: {
                    access_token: token,
                    groupWithRoles: groupWithRoles,
                    email: user.email,
                    username: user.username,
                },
            };
        }
        return {
            EM: "Your email/phone number or password is incorrect",
            EC: 1,
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs in service...",
            EC: -2,
            DT: "",
        };
    }
};
module.exports = {
    handleUserLogin,
    registerNewUser,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist,
};
