import express from "express";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import apiController from "../controller/apiController";
const router = express.Router();
const initApiRoutes = (app) => {
    router.get("/", (req, res) => res.send("hello"));
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userController.readFunction);
    router.post("/user/create", userController.createFunction);
    router.put("/user/update", userController.updateFunction);
    router.delete("/user/delete", userController.deleteFunction);

    router.get("/group/read", groupController.getGroupList);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
