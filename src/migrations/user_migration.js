"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("User", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            username: {
                type: Sequelize.STRING,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("User");
    },
};
