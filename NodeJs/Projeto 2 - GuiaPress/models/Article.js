const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("./Category") //Chama o model para fazer a relação do banco de dados

const Article = connection.define("article",{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) //1 categoria -> N artigos
Article.belongsTo(Category) //1 artigo -> 1 categoria

//Article.sync({force:true}) //Esse comando só pode ser usado 1x pois força o BD a ficar criando tabela frequente

module.exports = Article