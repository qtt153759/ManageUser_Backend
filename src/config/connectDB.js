const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jwt", "qtt153759", "truong157359", {
    host: "127.0.0.1",
    port: "3308",
    dialect: "mysql",
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
export default connection;
