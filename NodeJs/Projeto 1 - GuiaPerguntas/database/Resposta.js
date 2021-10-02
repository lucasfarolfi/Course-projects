const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('respostas', {
    texto:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{//É necessário para saber qual pergunta é associada a essa resposta
        type: Sequelize.INTEGER, //Inteiro
        allowNull: false
    }
})

Resposta.sync({force:false}).then(()=>{
    console.log("Tabela de resposta criada.")
})

module.exports = Resposta