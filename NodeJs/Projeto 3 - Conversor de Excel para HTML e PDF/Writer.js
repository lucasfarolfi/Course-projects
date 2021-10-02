const fs = require("fs")
//Biblioteca que possui o metodo promisify para converter callback em promises
const util = require("util")

class Writer{
    constructor(){
        //Converte o metodo writefile em uma promise para retornar resultado
        this.write = util.promisify(fs.writeFile)
    }

    async write(filename, data){

        //Caso consiga escrever, retorna true
        try{
            await this.write(filename, data)
            return true
        } //Caso dê um erro, retorna false
        catch(error){ 
            return false
        }
    }
}

module.exports = Writer