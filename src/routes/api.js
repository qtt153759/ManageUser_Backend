import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();
const initApiRoutes = (app) => {
    router.get("/", (req, res) => res.send("hello"));
    router.post("/register", apiController.handleRegister);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
