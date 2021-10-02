const router = require("express").Router()

//Routes
const IndexController = require("../controllers/IndexController")
const ArticlesController = require("../controllers/ArticlesController")
const CategoriesController = require("../controllers/CategoriesController")
const UsersController = require("../controllers/UsersController")

router.use("/", IndexController)
router.use("/", ArticlesController)
router.use("/", CategoriesController)
router.use("/", UsersController)

module.exports = router