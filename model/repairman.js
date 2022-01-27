const { DataTypes } = require('sequelize');
const sequelize = require("../database/init")

const repairmanModel = sequelize.define('repairman', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
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

    skill: {
        type: DataTypes.STRING
    },

    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, {
    sequelize,
    modelName: 'repairman'
});


module.exports = repairmanModel