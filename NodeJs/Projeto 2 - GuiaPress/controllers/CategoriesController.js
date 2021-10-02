const express = require("express")
const router = express.Router()
const Category = require("../models/Category")
const slugify = require("slugify")
const adminAuth = require("../middleware/adminAuth")

//Nova categoria
router.get("/admin/categorias/novo", adminAuth, (req,res)=>{
    res.render("admin/categories/new")
})

//Salvar categoria
router.post("/categorias/salvar", adminAuth, (req, res)=>{
    let title = req.body.title

    if(title != undefined){

        Category.create({
            title,
            slug: slugify(title) //Biblioteca para transformar o título em url amigável
        }).then(()=>{
          res.redirect("/admin/categorias")  
        })
    }
    else{
        res.redirect("/admin/categorias/novo")
    }
})

//Categorias (admin)
router.get("/admin/categorias", adminAuth, (req,res)=>{
    //Recebe todos os dados do BD em um array de objetos
    Category.findAll({raw: true}).then(category =>{ //Raw: true recebe apenas dados não vazios
        res.render("admin/categories/categories", {category})
    })
})

//Deletar Categoria
router.post("/categorias/deletar", adminAuth, (req,res)=>{
    let id = req.body.id

    if(id != undefined){ //SE NAO FOR NULO

        if(!isNaN(id)){ // SE FOR UM NÚMERO
            Category.destroy({where:{id: id}}).then(()=>{ //Delete se o atributo id for igual ao req.body.id
                res.redirect("/admin/categorias")
            })
        }
        else{ // SE NÃO FOR UM NÚMERO
            res.redirect("/admin/categorias")
        }
    }
    else{ // SE FOR NULO
        res.redirect("/admin/categorias")
    }
})

//Editar categoria
router.get("/admin/categorias/editar/:id", adminAuth, (req, res)=>{
    let id = req.params.id

    Category.findByPk(id).then((category)=>{ //Pesquisa pelo ID, caso ache, acontecerá isso

        if(category != undefined){ // Se a categoria tiver ID e está com conteudo

            res.render("admin/categories/edit", {category})
        }else{ //Se a categoria tiver ID mas está vazia
            res.redirect("/admin/categorias")
        }

    }).catch(error =>{ // Caso não ache o ID
        res.redirect("/admin/categorias")
    })
})

//Salvar edição
router.post("/admin/categorias/atualizar", adminAuth, (req, res)=>{
    let title = req.body.title
    let id = req.body.id
    //Edita uma categoria do BD, no texto e no slug
    Category.update({title: title, slug: slugify(title)}, {where:{id}}).then(()=>{ //A categoria que tenha o Atributo ID = let id
        res.redirect("/admin/categorias")
    })
})

module.exports = router