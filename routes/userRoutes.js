const express = require("express")
const router =express.Router();
const {stopLogin} = require('../middlewares/auth')
// User Controller
const {loadSignup,loadLogin,registerValidations,postResgister,postLogin,loginValidations} = require('../controllers/userController')
router.get("/",stopLogin,loadSignup)
router.get("/login",stopLogin,loadLogin)

router.post("/register",registerValidations,postResgister)
router.post("/postLogin",loginValidations,postLogin)
module.exports= router;

