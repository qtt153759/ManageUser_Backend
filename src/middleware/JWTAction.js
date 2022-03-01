import jwt from "jsonwebtoken";
require("dotenv").config();
// khai báo những route không cần check authen vs author
const nonSecurePaths = ["/", "/logout", "/login", "/register"];
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (e) {
        console.log(e);
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
const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    const cookies = req.cookies;
    const tokenFromHeader = getTokenFromHeader(req);
    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            // Cách gán vào biến req
            req.user = decoded;
            // nhớ phải return next() nếu chỉ next() thì sau khi hoàn thành tất cả middleware thì nó sẽ vẫn chạy tiếp các dòng ở dưới
            return next();
        }
    }
    return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
    });
};
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (roles && roles.length > 0) {
            let canAccess = roles.some(
                (item) => item.url === currentUrl || currentUrl.includes(item.url)
            );
            if (canAccess) return next();
        }
        return res.status(403).json({
            EC: -1,
            DT: "",
            EM: "you don't have permission to access this resource...",
        });
    }
    return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
    });
};
module.exports = {
    checkUserJWT,
    createJWT,
    verifyToken,
    checkUserPermission,
};
