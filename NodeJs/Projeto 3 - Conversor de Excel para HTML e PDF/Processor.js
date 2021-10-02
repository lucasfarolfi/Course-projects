class Processor{
    static process(data){

        //dataRows irá receber um array contendo as strings separadas por quebra de linha
        let dataRows = data.split("\r\n")
        let dataAll = []

        dataRows.forEach(row=>{
            //Recebe um array com as strings da linha atual
            let cols = row.split(";")
            //Acrescenta esse array em um outro array
            dataAll.push(cols)
        })
        return dataAll
    }
}

module.exports = Processor