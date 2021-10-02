const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const adminAuth = require("../middleware/adminAuth")

//Lista de usuários
router.get("/admin/usuarios", adminAuth, (req, res)=>{
    
    User.findAll().then(users=>{

        if(users != undefined){
            res.render("admin/users/users", {users})
        }
        else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

//Cadastrar usuários
router.get("/admin/usuarios/cadastrar", adminAuth, (req, res)=>{
    res.render("admin/users/signin")
})

//Salvar usuário
router.post("/usuarios/salvar", adminAuth, (req, res)=>{
    let email = req.body.email
    let password =  req.body.password

    //Consulta os usuários do banco de dados
    User.findOne({where:{email}}).then(user=>{
        if(user == undefined){
            //Salt serve para definir um nivel de encriptação para a senha
            let salt = bcrypt.genSaltSync(10)

            //Hash é a senha encriptada 
            let hash = bcrypt.hashSync(password, salt)

            //Salva o cadastro do usuário com o hash no lugar da senha
            User.create({
                email,
                password: hash
            }).then(()=>{
                res.redirect("/admin/usuarios")
            }).catch(erro=>{
                res.json(erro)
            })
        }
        else{
            res.redirect("/admin/usuarios/cadastrar")
        }
    })
    
})

//Página de login
router.get("/admin/login", (req, res)=>{
    res.render("admin/users/login")
})

//Rota de autenticação após o login
router.post("/autenticacao", (req, res)=>{
    let email = req.body.email
    let password = req.body.password

    User.findOne({where:{email}}).then(user=>{

        if(user != undefined){

            //Recebe bool ao comparar a senha digitada com a senha do BD
            let comparePassword = bcrypt.compareSync(password, user.password)

            //Se a senha estiver certa
            if(comparePassword){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                res.redirect("/admin")
            }
            else{
                res.redirect("/admin/login")
            }
        }
        else{
            res.redirect("/admin/login")
        }

    }).catch(err=>{
        res.redirect("/admin/login")
    })
})

//Sair da conta/Logout
router.get("/logout", (req, res)=>{
    req.session.user = undefined

    res.redirect("/")
})

module.exports = router