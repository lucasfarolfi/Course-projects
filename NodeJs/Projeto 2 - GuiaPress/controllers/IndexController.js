const router = require("express").Router()
const Category = require("../models/Category")
const Article = require("../models/Article")
const adminAuth = require("../middleware/adminAuth")

//Página home
router.get("/", (req,res)=>{

    Article.findAll({order:[['id', 'DESC']], limit: 4}).then(articles=>{

        Category.findAll().then(categories=>{//Passa as categorias para o menu
            res.render("index", {articles, categories}) 
        })
    })
})

//Página de um artigo
router.get("/artigos/:slug", (req, res)=>{

    let slug = req.params.slug

    Article.findOne({where:{slug}}).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories=>{//Passa as categorias para o menu
                res.render("article-page", {article, categories})
            })
        }
        else{
            res.redirect("/")
        }
    }).catch(erro=>{
        res.redirect("/")
    })
})

//Página de artigos de uma categoria
router.get("/categorias/:slug", (req, res)=>{
    let slug = req.params.slug

    //Pesquisa a categoria com base no slug
    Category.findOne({
        where:{slug},
        //Pega os artigos dessa categoria e transforma-os em metodos de categoria
        include:[{model: Article}] 
    }).then(category=>{

        if(category != undefined){

            //Procura todas as categorias para o menu do header
            Category.findAll().then(categories=>{
                //passa um objeto artigos que recebe os artigos da categoria
               res.render("category", {articles: category.articles ,category, categories})  
            })
        }
        else{
            res.redirect("/")
        }

    }).catch(erro=>{
        res.redirect("/")
    })
})

//Paginação de artigos
router.get("/artigos/pagina/:num", (req, res)=>{
    let page = req.params.num
    
    let offset

    //Se não for um número ou o parâmetro for 1
    if(isNaN(page) || page === 1){
        offset = 0
    }
    else{
        offset = parseInt(page - 1) * 4
    }

    //Pega todos os artigos e pega um artibuto .count para contar quantos artigos tem
    Article.findAndCountAll({
        limit: 4,
        offset
    },
        {order: ['id', 'DESC']}
    ).then(articles=>{

        let next

        //Se 24 > 20, então não existem próximas paginas para serem exibidas, logo
        //next é falso
        if(offset + 4 >= articles.count){
            next = false
        }
        else{
            next = true
        }

        //Objeto contendo os artigos e o boolean que confere se tem próxima pagina
        let result = {
            page: parseInt(page),
            articles,
            next
        }

        Category.findAll().then(categories=>{
           res.render("page", {result, articles: result.articles.rows, categories}) 
        })
        
    }).catch(erro=>{
        res.json(erro)
    })
})

//Página do admin
router.get("/admin", adminAuth, (req, res)=>{
    res.render("admin/admin")
})

module.exports = router