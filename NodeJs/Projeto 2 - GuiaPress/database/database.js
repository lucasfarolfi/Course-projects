const Sequelize = require("sequelize")

const connection = new Sequelize({
    database: "guiapress",
    username: "root",
    password: "123456",
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection