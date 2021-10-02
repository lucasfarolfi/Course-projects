const fs = require("fs")
//Biblioteca que possui o metodo promisify para converter callback em promises
const util = require("util")

class Reader{

    constructor(){

        //Converte uma função de callback em uma promise para retornar dados
        this.reader = util.promisify(fs.readFile)
    }

    //Método que lê um arquivo ao passar o diretório
    async read(filepath){
        
        try{
            //Utiliza o await para o programa seguir em ordem e para pegar apenas
            //os dados do result e retornar
            return await this.reader(filepath, "utf-8")
        }
        catch(error){
            return undefined
        }
    }

    /*
    write(filepath, write){
        fs.writeFile(filepath, write, error=>{
            if(error){
                console.log("Ocorreu um erro")
            }
        })
    }*/
}

module.exports = Reader