import express from "express";
const router = express.Router();
import homeController from "../controller/homeController";
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    return app.use("/", router);
};
export default initWebRoutes;
