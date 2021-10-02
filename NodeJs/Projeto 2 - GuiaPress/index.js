const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const session = require("express-session")

//View engine
app.set("view engine", "ejs")

//Static
app.use(express.static("public"))

//Sessions
app.use(session({
    secret: "algoparadeixarassessoesmaisseguras", //Aumenta a segurança da sessão
    cookies:{maxAge: 30000} //Utiliza o tempo limite de inatividade para 30seg
}))

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//MySQL
connection.authenticate().then(()=>{
    console.log("Banco de dados conectado com sucesso...")
}).catch((erro)=>{
    console.log(erro)
})

//Tabelas do mySql
const Category = require("./models/Category")
const Article = require("./models/Article")

//Rotas
app.use("/", require("./routes/routes"))

/*
//Rotas para testar sessões
app.get("/sessao", (req, res)=>{
    req.session.nome = "Lucas"

    res.send("Sessão gerada !")
})
app.get("/leitura", (req, res)=>{
    res.json({nome: req.session.nome})
})
*/

//Servidor
const port = 3001

app.listen(port, ()=>{
    console.log("O servidor está rodando...")
})