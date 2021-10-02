const Sequelize = require('sequelize') //Importa o Sequelize para compatibilizar o node com o BD

const connection = new Sequelize("guiaperguntas", "root", "123456", { //BD, usuario, senha
    host: 'localhost', // Host do site
    dialect: 'mysql' // Tipo do BD
})

module.exports = connection