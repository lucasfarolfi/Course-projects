//Passo 2 - Faz a classe de objetos responsável por armazenar as despesas
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = Math.abs(valor)
    }

    //Passo 4 - Criar um método para avaliar se todos os dados estão preenchidos
    validarDados(){
        for(let i in this){ //i vira índice de todos os atributos (this), como se fosse um array

            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}
//Passo 3 - Cria uma classe para o registro resgistro no local storage, usando a Notação JSON
class BD{

    //Responsável por verificar qual o id atual do localStorage
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){ //Se ainda não tem nada registrado no LS, então é incrementado algo 
            localStorage.setItem('id', 0)
        }
    }

    //Método responsável por criar um índice para cadastrar ids de forma decrescente no localStorage
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    //Responsável por registrar a despesa no Id atual do localStorage
    registrar(despesa){

        let idAtual = this.getProximoId()
        /*  localStorage.getItem -> recupera os dados do localStorage
        localStorage.setItem -> insere os dados no localStorage */

        /* JSON.stringfy(despesa) -> converte o objeto despesa para uma string
    
        Ex:  
        objeto despesa: despesa { ano: 2020, mes: 1, dia: 20, tipo: 1, descricao: 'Videogame', valor: 2000}
        JSON.stringfy(despesa) : 'despesa{ "ano": 2020, "mes": 1, "dia": 20, "tipo": 1, "descricao": "Videogame", "valor": 2000 }'
            
        Obs: Utiliza-se JSON para facilitar a comunicação com o navegador, que utiliza apenas string e nao pode ser objeto 
    
        !!!IMPORTANTE: COMO CONVERTER JSON PARA OBJETO !!!
        JSON.parse(despesaJSON) */

        localStorage.setItem(idAtual, JSON.stringify(despesa))

        localStorage.setItem('id', idAtual) //Atualiza o valor do Id para não ser reescrito
    }

    //Passo 6 - Criar um método parar recuperar os registros no localStorage
    recuperarDespesas(){

        let listaDespesas = []
        
        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i)) //Pega o índice da string JSON, converte em objeto e armazena

            //Se os dados do índice foram deletados ou não existem
            if(despesa === null){
                continue //Pula para a repetição seguinte e desconsidera o que está em baixo
            }
 
            despesa.id = i
            listaDespesas.push(despesa)
        }
        return listaDespesas
    }

    //Passo 7 - Criar um método para retornar a pesquisa
    pesquisarDesp(despesa){
        let despesasFiltradas = []

        despesasFiltradas = this.recuperarDespesas()

        console.log(despesasFiltradas)

        //ano
        if(despesa.ano != ''){
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            console.log('Filtro de mês')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != ''){
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descrição
        if(despesa.descricao != ''){
            console.log('Filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != ''){
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        console.log(despesasFiltradas)
        return despesasFiltradas
    }

    //Cria o método remover para excluir algum elemento da lista
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new BD ()

//Passo 1 - Criação da função de cadastro de despesa (onclick)
function cadastroDespesa(){
    //Capta os valores dos formulários
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //Cria a classe com os valores atribuidos
    let despesa = new Despesa (ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    //Variáveis responsáveis por controlar as informações do modal no botão submit
    let modalTitle = document.getElementById('modal-title'), 
    modalDescription = document.getElementById('modal-description'), 
    modalBtn = document.getElementById('modal-btn')

    //Condição que verifica se os dados estão preenchidos para registrá-los ou não
    if(despesa.validarDados() == true){
        bd.registrar(despesa)
        modalTitle.innerHTML = 'Registro inserido com sucesso'
        modalTitle.className = 'modal-header text-success'

        modalDescription.innerHTML = 'Despesa cadastrada com sucesso'

        modalBtn.className = 'btn btn-success'
        modalBtn.innerHTML = 'Voltar'

        $('#modalGravacao').modal('show')

        //Limpa os campos após a inserção da despesa
        ano.value = ''
        mes.value = '' 
        dia.value = '' 
        tipo.value = '' 
        descricao.value = '' 
        valor.value = ''
    }
    else{
        modalTitle.className = 'modal-header text-danger'
        modalTitle.innerHTML = 'Erro ao gravar o registro'

        modalDescription.innerHTML = 'Alguns campos não foram preenchidos'

        modalBtn.className = 'btn btn-danger'
        modalBtn.innerHTML = 'Voltar e corrigir'

        $('#modalGravacao').modal('show')
    }
}

//Passo 5 - Criar uma função responsável por mostrar os registros feitos

//Cria um array com o parâmetro default ou recebe como parâmetro da função pesquisarDespesa()
//Se as despesas não forem filtradas, então receberá um parâmetro default (false)
function carregarDespesas(despesas = [], temFiltro = false){

    //Caso esta função use parâmetro default para criar o array despesas[] e se o temFiltro for false,
    // então o array despesas receberá toda a lista de despesas sem filtragem
    if(despesas.length == 0 && temFiltro == false){
        //Recupera um array de objetos com as despesas
        despesas = bd.recuperarDespesas()
    }

    //Recupera a lista pelo ID do tbody
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = '' //Apaga o conteúdo HTML criado anteriormente para limpar a tabela

    //Recupera os índices utilizando forEach
    despesas.forEach(function(d){

        //Cria uma linha por índice (tr)
        let linha = listaDespesas.insertRow()

        //Cria 4 colunas por índice (td)        
        linha.insertCell().innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //Converte o número do tipo da despesa para o nome da mesma
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Esporte'
                break
        }

        linha.insertCell().innerHTML = d.tipo
        linha.insertCell().innerHTML = d.descricao
        linha.insertCell().innerHTML = `R$ ${d.valor}`

        //Passo 7 - Criar o botão de exclusão
        let btn = document.createElement("button")
        linha.insertCell().append(btn) //incluir o elemento btn na coluna 4

        btn.className = 'btn btn-danger' //botão vermelho
        btn.innerHTML = '<i class="fas fa-times"></i> ' // Entidade X
        btn.id = `id_despesa_${d.id}` //O id_despesa_ é para nomear um id na tag html a fins de evitar problemas

        btn.onclick = function (){
            let id = this.id.replace('id_despesa_', '') //Remove a parte id_despesa_ e aproveita o valor do id
            bd.remover(id)

            window.location.reload() //Atualiza a página
        }
    })
}

//Passo 7 - Criar a função responsável por pesquisar a despesa
function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    //Criando a despesa pesquisada como um objeto
    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

    //Recebe todas as despesas filtradas com base na pesquisa do usuário
    let despesas = bd.pesquisarDesp(despesa)

    //Chama a função carregarDespesas passando o array despesas. A lógica de mostrar a tabela no HTML é a mesma, porém
    //há diferença para diferenciar a lista de despesas normal da lista filtrada, portanto, o true passado por parâmetro
    //indica que as despesas estão filtradas
    carregarDespesas(despesas, true)
}