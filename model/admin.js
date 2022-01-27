const { DataTypes } = require('sequelize');
const sequelize = require("../database/init")

const adminModel = sequelize.define('admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, {
    sequelize,
    modelName: 'admin'
});


module.exports = adminModel