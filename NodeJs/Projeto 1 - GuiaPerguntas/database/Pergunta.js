const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('perguntas',{   //Cria a tabela perguntas
    titulo:{
        type: Sequelize.STRING, //Tipo de elemento - string (frase pequena)
        allowNull: false    //Não aceita formulário sem nada escrito
    },
    descricao:{
        type: Sequelize.TEXT, // Tipo de elemento - text (texto muito grande)
        allowNull: false
    }
})

//Responsável por criar ou atualizar a tabela, e quando criada, não forçar a criação de outra
Pergunta.sync({force:false}).then(()=>{
    console.log("Tabela de perguntas criada.")
})

module.exports = Pergunta //Exporta