const { DataTypes } = require('sequelize');
const sequelize = require("../database/init")

const taskModel = sequelize.define('task', {
    task_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    repairman_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    skill: {
        type: DataTypes.STRING,
    },
    cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, {
    sequelize,
    modelName: 'task'
});


module.exports = taskModel