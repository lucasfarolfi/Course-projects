class indexController{
    async index(req, res){
        res.send("esta é a página home")
    }
}

module.exports = new indexController()