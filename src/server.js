import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import cors from "cors";
require("dotenv").config();
const app = express();

// config cors (url_frontend+credentials cookie)
app.use(cors({ origin: process.env.URL_FRONTEND, credentials: true }));
//config view engine
configViewEngine(app);

//config body-parser,cookie-parser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection to db
connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);
//not found api
app.use((req, res) => {
    return res.send("404 not found");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("ManageUser is running on the port = " + PORT);
});
