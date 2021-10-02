//Biblioteca que converte arquivo html para pdf
const pdf = require("html-pdf")

//Classe que possui um método para converter html em PDF
class PDFWriter{
    static async writePDF(filename, html){

        /*
        Create: parâmetro 1 - Os dados HTML
                parametro 2 - Um JSON

        toFile: parâmetro 1 - O nome do arquiv
                parâmetro 2 - Uma função callback que recebe o erro como parâmetro
        */
        pdf.create(html, {}).toFile(filename, error=>{})
    }
}
module.exports = PDFWriter