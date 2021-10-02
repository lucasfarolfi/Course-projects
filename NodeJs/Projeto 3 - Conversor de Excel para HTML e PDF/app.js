//Classes
let Reader = require("./Reader")
let Processor = require("./Processor")
let Table = require("./Table")
const HtmlParser = require("./HtmlParser")
const Writer = require("./Writer")
const PDFWriter = require("./PDFWriter")

//Objeto da classe reader
let r1 = new Reader()

async function main(){

    //Espera o método read retornar para seguir o código normal
    let data = await r1.read("./users.csv")

    let dataProcessed = Processor.process(data)

    let table = new Table(dataProcessed)

    //Recebe o arquivo html lido que foi retornado deste método
    let html = await HtmlParser.parse(table)

    //Cria uma classe de escrever um html
    let writer = new Writer()

    //Escreve um html com um nome aleatório, e passa o conteudo do arquivo html da variável
    writer.write(Date.now() + ".html", html)

    //Escreve os dados HTML em um arquivo PDF
    PDFWriter.writePDF(Date.now() + ".PDF", html)
}

main()