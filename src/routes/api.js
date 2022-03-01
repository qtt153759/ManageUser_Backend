import express from "express";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import apiController from "../controller/apiController";
import roleController from "../controller/roleController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";

const router = express.Router();
const initApiRoutes = (app) => {
    // tất cả các route phải check 2 cái middleware này
    router.all("*", checkUserJWT, checkUserPermission);
    // Những account này ko phải check checkUserJWT, checkUserPermission do được quy đinh trong JWTAction.js
    router.get("/", (req, res) => res.send("hello"));
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/account", apiController.getUserAccount);
    //thêm sửa xóa user
    router.get("/user/read", userController.readFunction);
    router.post("/user/create", userController.createFunction);
    router.put("/user/update", userController.updateFunction);
    router.delete("/user/delete", userController.deleteFunction);
    //gắn quyền qua đường link
    router.get("/role/read", roleController.readFunction);
    router.post("/role/create", roleController.createFunction);
    // router.put("/role/update", roleController.updateFunction);
    router.delete("/role/delete", roleController.deleteFunction);

    router.get("/group/read", groupController.getGroupList);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
