const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken") //JWT lib

//JWT Secret - Tem a mesma utilidade que o salt (Não pode ser revelado, pois compromete a criptografia das senhas)
const JWTSecret = "auhdq83hr0w38rhw9bns9gne4g89n89n984ng98dn4g"

//Middleware de autenticação - Ele rodará antes de executar a função da rota
function auth(req, res, next){
    
    //Verifica se há algum token configurado no authorization desta rota
    //Obs: Para testar no postman, precisa ir na aba de authorization, colocar bearer token nas opções e utilizar o token gerado
    let authToken = req.headers['authorization']
    
    //Se o token existir
    if(authToken != undefined){

        const bearer = authToken.split(" ")//O token recebido está assim: "bearer auhd0893u208f0s8heg0n34n", precisa separar a palavra bearer do token
        const token = bearer[1] //Pega só o token do bearer token e armazena nesta variável

        //Verifica se o token é valido
        /*
            Parâmetro 1 - O token a ser verificado
            Parâmetro 2 - O secret que utilizou para criptografar o token
            Parâmetro 3 - Uma função que recebe um erro true ou false e que recebe os dados do usuário dono do token
        */
        jwt.verify(token, JWTSecret, (error, data)=>{
            if(error){
                res.status(401) //Token inválido
                res.json({erro: "Token inválido"})
            } 
            else{
                req.token = token //Cria uma requisição do token que pode ser utilizada em qualquer rota
                req.loggedUser = {id: data.id, email: data.email}//Cria uma requisição de um objeto do usuário que pode ser utilizada em qualquer rota com auth
                res.status(200)//Sucesso
                next() 
            }
        })
    }
    else{
        res.status(401) //Token não validado
        res.json({erro: "Token inválido"})
    }
}

//O CORS é necessário para desbloquear o consumo de dados da API
app.use(cors())

//Bodyparser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Database
let DB = {
    games:[
        {
            id: 1,
            title: "Call of Duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 2,
            title: "Dying Light",
            year: 2015,
            price: 30
        },
        {
            id: 3,
            title: "Counter Strike Source",
            year: 2005,
            price: 10
        }
    ],
    users:[ //Tabela de usuários da autenticação
        {
            id: 1,
            name: "Lucas",
            email: "lucasgostoso123@gmail.com",
            password: "gostoso123"
        },
        {
            id: 2,
            name: "Pedro",
            email: "pedromaluco@gmail.com",
            password: "maluco123"
        }
    ]
}

//Rotas de consumo

//Listagem de todos os games
app.get("/games", auth, (req, res)=>{
    console.log(req.token) //A rota de games está com autenticação, portanto poderá utilizar requisições criadas da autenticação
    console.log(req.loggedUser)//A rota de games está com autenticação, portanto poderá utilizar requisições criadas da autenticação
    res.statusCode = 200 //Operação com sucesso
    res.json(DB.games) //Mostra a listagem de jogos no database
})

//Listagem única de um game
app.get("/game/:id", (req, res)=>{

    //Not a number (Se o id não for um número)
    if(isNaN(req.params.id)){
        res.sendStatus(400) //Requisição invalida
    }
    else{
        //Converte o id JSON para inteiro
        let id = parseInt(req.params.id)

        let game = DB.games.find(game => game.id == id) //Retorna o game q o game.id é igual ao id

        if(game != undefined){
            
            res.statusCode = 200 //Sucesso
            res.json(game)
        }
        else{
            res.sendStatus(404) //Não encontrado
        }
    }
})

//Cadastro de dados na API
app.post("/game", (req, res)=>{
    let {title, year, price} = req.body

    //Verifica se os parâmetros estão errados, caso esteja será respondido com um erro
    if(title === undefined || year === undefined || isNaN(year) || price === undefined || isNaN(price)){
        res.sendStatus(400) //Bad request
    }
    else{
        DB.games.push({
            id: DB.games.length + 1,
            title,
            year,
            price
        })

        res.sendStatus(200) //Ok
    }
})

//Deleta dados
app.delete("/game/:id", (req, res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400) //Bad request
    }
    else{
        let id = req.params.id
        let index = DB.games.findIndex(game => game.id == id)

        if(index === -1){
            res.sendStatus(404) //Não encontrado
        }
        else{
            DB.games.splice(index, 1) //Elemento do array que será removido, a quantidade que sera removida
            res.sendStatus(200) //Sucesso
        }
    }
})

//Edição de dados
app.put("/game/:id", (req, res)=>{
    
    if(isNaN(req.params.id)){
        res.sendStatus(400) //Bad request
    }
    else{
        let id = parseInt(req.params.id)
        let game = DB.games.find(game => game.id == id)

        if(game != undefined){
            let {title, year, price} = req.body

            if(title === undefined && year === undefined && price === undefined){
                res.sendStatus(400) //Bad request
            }
            else{
                if(title != undefined){
                    game.title = title
                }
                if(year != undefined){
                    game.year = year
                }
                if(price != undefined){
                    game.price = price
                }

                res.sendStatus(200) //Success
            }
        }
        else{
            res.sendStatus(404) //Not found
        }
    }
})

//Rotas de autenticação
app.post("/autenticacao", (req, res)=>{
    let {email, password} = req.body

    if(email != undefined && password != undefined){
        
        let user = DB.users.find(user => user.email == email)

        //Verifica se o email do usuário existe no BD
        if(user != undefined){

            //Compara a senha
            if(user.password == password){

                /*Método responsável por gerar uma seção do usuário com base em um token
                    Parâmetro 1: Pega as informações do usuário publicas para utilizar na sessão
                    Parâmetro 2: O secret que é uma senha do jwt para permitir a autenticação
                    Parâmetro 3: Atributos de como irá funcionar a sessão, ex abaixo: expira em 48h
                    Parâmetro 4: Função de callback que executará após o metodo sign que é assincrono,
                        e recebe como parâmetro o erro e o token do usuário
                */
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn:'48h'},(error, token)=>{
                    if(error){
                        res.status(400) //Bad request
                        res.json({token: "Falha interna"})
                    }
                    else{
                        res.status(200) //Success
                        res.json({token: token}) //res.data retornado
                    }
                })
            }
            else{
                res.status(401)
                res.json({err: "Credenciais inválidas"})
            }
            
        }
        else{
            res.status(404) //Not found
            res.json({err: "Usuário não encontrado"})
        }
    }
    else{
        res.status(400) //Bad request
        res.json({err: "Requisição inválida"})
    }
})

const port = 8080
app.listen(port, ()=>{
    console.log("A API está rodando !")
})