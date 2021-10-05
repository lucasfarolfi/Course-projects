const User = require("../models/User")

class userController{
    async findAll(req, res){
        try{
            let users = await User.findAll()
            return res.status(200).json(users)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: "Erro interno"})
        }
    }

    async create(req, res){
        let {name, email, password} = req.body

        //Errors
        if((name == undefined || name == '') || (email == undefined || email == '') || (password == undefined || password == '')){
            if((name == undefined || name == '') && (email == undefined || email == '') && (password == undefined || password == '')){
                res.status(400)//Bad request
                res.json({error: "Todos os dados estão inválidos!"})
                return
            }
            if((name == undefined || name == '') && (email == undefined || email == '')){
                res.status(400)//Bad request
                res.json({error: "Nome e e-mail inválidos!"})
                return
            }
            if((name == undefined || name == '') && (password == undefined || password == '')){
                res.status(400)//Bad request
                res.json({error: "Nome e senha inválidos!"})
                return
            }
            if((email == undefined || email == '') && (password == undefined || password == '')){
                res.status(400)//Bad request
                res.json({error: "E-mail e senha inválidos!"})
                return
            }
            if((name == undefined || name == '')){
                res.status(400)//Bad request
                res.json({error: "Nome inválido!"})
                return
            }
            if((email == undefined || email == '')){
                res.status(400)//Bad request
                res.json({error: "E-mail inválido!"})
                return
            }
            if((password == undefined || password == '')){
                res.status(400)//Bad request
                res.json({error: "Senha inválida!"})
                return
            }
        }
        else{
            if(password.length < 8){
                res.status(400)//Bad request
                res.json({error: "A senha deve ter 8 ou mais caracteres"})
                return
            }

            let emailExists = User.findEmail(email)

            if(emailExists){
                res.status(406)
                res.json({error: "O E-mail já está cadastrado!"})
                return
            }

            await User.create(name,email,password)

            res.status(200)
            res.json({status: "Cadastro feito com sucesso!"})
        }
    }
}

module.exports = new userController()