import express from "express";
const router = express.Router();
import homeController from "../controller/homeController";
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.post("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user", homeController.handleUpdateUser);

    return app.use("/", router);
};
export default initWebRoutes;
