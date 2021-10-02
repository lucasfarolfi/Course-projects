const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define("categories",{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Category.sync({force:true}) //Este método so pode ser utilizado 1x pois força o BD a criar a mesma tabela frequte

module.exports = Category