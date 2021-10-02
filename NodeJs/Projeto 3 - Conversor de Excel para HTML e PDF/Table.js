class Table{
    constructor(arr){
        //Pega a primeira linha do array, que é o cabeçalho da tabela
        this.header = arr[0]

        //Remove o primeiro elemento do array, que é o cabeçalho
        arr.shift()

        //Pega o array exceto o cabeçalho
        this.rows = arr
    }

    //objeto.rowsCount - conta as linhas da tabela
    get rowsCount(){
        return this.rows.length
    }
    //objeto.columnsCount - Conta as colunas da tabela
    get columnsCount(){
        return this.header.length
    }
}

module.exports = Table