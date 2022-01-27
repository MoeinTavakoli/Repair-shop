const { DataTypes } = require('sequelize');
const sequelize = require("../database/init")

const requestModel = sequelize.define('request', {
    request_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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


    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, {
    sequelize,
    modelName: 'request'
});


module.exports = requestModel