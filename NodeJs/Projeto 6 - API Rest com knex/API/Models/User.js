const knex = require("../Database/database")
const bcrypt = require("bcrypt")

class User{
    async findAll(){
        try{
            return await knex.select().table("users")
        }
        catch(error){
            console.log(error)
            return undefined
        }
    }

    async create(name, email, password){
        try{
            let hash = await bcrypt.hash(password, 10)
            await knex.insert({name, email, password: hash, role: 0}).table("users")
        }
        catch(error){
            console.log(error)
        }
    }

    async findEmail(email){
        try{
            let emailExists = await knex.select().table("users").where({email})

            if(emailExists != undefined) return true //Se ele existir
            else return false //Se não existir
        }
        catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = new User()