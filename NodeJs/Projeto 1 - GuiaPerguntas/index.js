const express = require("express")//Importa o express
const app = express()
const bodyParser = require("body-parser") //Instala e importa o body parser para recuperar dados de formulários
const connection = require("./database/database") //importa o objeto responsável pela conexão com o BD
const Pergunta = require("./database/Pergunta") //Importa o objeto contendo a tabela de perguntas do BD
const Resposta = require("./database/Resposta") //Importa o objeto contendo a tabela de respostas do BD

//Conexão com o Banco de dados
connection
    .authenticate() //Checa se a conexão com o banco de dados está funcionando
    .then(()=>{ //Então faz isso
        console.log("Banco de dados conectado !")
    })

    .catch((msgErro)=>{ //Caso não funcione, mostrar o erro
        console.log(msgErro)
    })

// Faz o express ler o ejs como uma página HTML
app.set("view engine", "ejs")

// Faz o express ler arquivos estáticos
app.use(express.static("public"))

//Permite com que a pessoa envie os dados pelo formulário e decodifica os dados em uma estrutura js
app.use(bodyParser.urlencoded({extended: false}))
//Recupera dados em notação JSON
app.use(bodyParser.json())

//Rotas
app.get("/", (req, res)=>{

    //Método que captura todos os dados da tabela, filtra com o objeto raw e passa para o objeto de perguntas
    Pergunta.findAll({raw: true, order:[ //Order filtra a ordem para crescente ou decrescente
        ['id','DESC'] //[tipo, DESC ou ASC]
    ]}).then((perguntas)=>{
        console.log(perguntas)
        res.render("index",{ //Passa o objeto perguntas para o ejs
            perguntas
        })
    })
})

app.get("/perguntar", (req,res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {//Método post após enviar o formulário

    // Formulários recuperados pelo body parser
    let titulo = req.body.titulo
    let descricao = req.body.descricao

    //Pergunta armazenada na tabela do banco de dados
    Pergunta.create({ 
        titulo,
        descricao
    }).then(()=>{
        res.redirect("/") //Redireciona para a home
    })
})

app.get("/pergunta/:id",(req,res)=>{ //Pesquisa condicional de uma pergunta
    let id = req.params.id
    Pergunta.findOne({where: {id}}).then((pergunta)=>{ //Procura um id com essa pergunta
        if(pergunta != undefined){ //Se houver pergunta

            //Pega todas as respostas que tem um id de pergunta igual ao do objeto pergunta
            Resposta.findAll({where: {perguntaId: pergunta.id} , order:[['id', 'DESC']]}).then((resposta)=>{
                res.render('pergunta', {pergunta, resposta}) //Passa a pergunta e as respostas para o front
            })

        }else{ //Se não houver
            res.render('perguntaNaoEncontrada')
        }
    })
})

app.post("/resposta",(req,res)=>{
    let texto = req.body.corpo
    let perguntaId = req.body.pergunta

    Resposta.create({
        texto,
        perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId)
    })
})
//Configura a porta do servidor
const porta = 3001;

app.listen(porta, ()=>{
    console.log("O servidor está ligado !")
})