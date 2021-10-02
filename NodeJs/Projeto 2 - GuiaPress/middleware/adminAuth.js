function adminAuth(req, res, next){
    
    //Se o usuário estiver logado ou a sessão do usuário existir
    if(req.session.user){

        //Executará a rota normalmente
        next()
    }
    else{
        res.redirect("/admin/login")
    }
}

module.exports = adminAuth