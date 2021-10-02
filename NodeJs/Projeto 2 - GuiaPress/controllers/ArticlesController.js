const express = require("express")
const router = express.Router()
const Category = require("../models/Category")
const Article = require("../models/Article")
const slugify = require("slugify")
const adminAuth = require("../middleware/adminAuth")

//Rota de todos os artigos
router.get("/admin/artigos", adminAuth, (req,res)=>{

    //Recebe todos os artigos salvos no Banco de Dados
    Article.findAll({
        include:[{model:Category}] //Inclui o objeto category no objeto articles
    }).then(articles=>{
        res.render("admin/articles/articles", {articles}) //Manda os artigos pro front
    })
})

//Novo artigo
router.get("/admin/artigos/novo", adminAuth, (req,res)=>{

    //Recebe todas as categorias salvas no banco de dados
    Category.findAll().then((categories)=>{
        res.render("admin/articles/new", {categories}) //Passa as categorias pro front
    })
})

//Salvar novo artigo
router.post("/artigo/salvar", adminAuth, (req, res)=>{
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    //Salva um artigo na tabela de Artigos do BD
    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId: category //CategoryId é um método gerado pelo BelongsTo, por conta do relacionamento
    }).then(()=>{
        res.redirect("/admin/artigos")
    })
})

//Deletar Artigos
router.post("/artigos/deletar", adminAuth, (req,res)=>{
    let id = req.body.id

    if(id != undefined){ //SE NAO FOR NULO

        if(!isNaN(id)){ // SE FOR UM NÚMERO
            Article.destroy({where:{id: id}}).then(()=>{ //Delete se o atributo id for igual ao req.body.id
                res.redirect("/admin/artigos")
            })
        }
        else{ // SE NÃO FOR UM NÚMERO
            res.redirect("/admin/artigos")
        }
    }
    else{ // SE FOR NULO
        res.redirect("/admin/artigos")
    }
})

//Editar artigos
router.get("/admin/artigos/editar/:id", adminAuth, (req, res)=>{
    let id = req.params.id

    Article.findByPk(id).then(article=>{
        if(article != undefined){

            Category.findAll().then(categories=>{
                res.render("admin/articles/edit", {article, categories})
            })    
        }
        else{
            res.redirect("/")
        }
    }).catch(erro=>{
        res.redirect("/")
    })
})

//Atualizar edição de artigos
router.post("/admin/artigo/atualizar", adminAuth, (req, res)=>{
    let title = req.body.title
    let id = req.body.id
    let body = req.body.body
    let categoryId = req.body.category

    Article.update({
        id,
        title,
        slug: slugify(title),
        body,
        categoryId
    },{where:{id}})
    .then(
        res.redirect("/admin/artigos")
    ).catch(erro=>{
        res.redirect("/admin/artigos")
    })
})

module.exports = router