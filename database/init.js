const { Sequelize } = require('sequelize');
const config = require("../config").databse

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: 'localhost',
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

module.exports = sequelize