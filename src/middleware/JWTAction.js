import { config } from "bluebird";
import jwt from "jsonwebtoken";
require("dotenv").config();
const createJWT = () => {
    let payload = { name: "qtt153759", address: "hanoi" };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token);
    } catch (e) {
        console.log(err);
    }
    return token;
};
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (e) {
        console.log(e);
    }
    return data;
};
module.exports = {
    createJWT,
    verifyToken,
};
