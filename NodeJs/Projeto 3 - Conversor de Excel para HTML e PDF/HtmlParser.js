let ejs = require("ejs")

//Classe que possui um método que converte array de tabelas em uma tabela HTML
class HtmlParser{
    static async parse(table){
        //Utiliza a função async de renderizar um arquivo ejs, converte para sync e retorna a
        //leitura do arquivo html
        return await ejs.renderFile("./table.ejs", {header: table.header, rows: table.rows})
    }
}

module.exports = HtmlParser