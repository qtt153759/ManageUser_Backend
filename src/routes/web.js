import express from "express";
const router = express.Router();
import homeController from "../controller/homeController";
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    return app.use("/", router);
};
export default initWebRoutes;
