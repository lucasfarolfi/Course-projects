const express = require("express")
const router = express.Router()
const indexController = require("../Controllers/indexController")
const userController = require("../Controllers/userController")

router.get("/", indexController.index)

router.get("/usuarios", userController.findAll)
router.post("/usuarios", userController.create)

module.exports = router