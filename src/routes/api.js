import express from "express";
import userController from "../controller/userController";
import apiController from "../controller/apiController";
const router = express.Router();
const initApiRoutes = (app) => {
    router.get("/", (req, res) => res.send("hello"));
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.get("/user/read", userController.readFunction);
    router.get("/user/create", userController.createFunction);
    router.get("/user/update", userController.updateFunction);
    router.get("/user/delete", userController.deleteFunction);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
