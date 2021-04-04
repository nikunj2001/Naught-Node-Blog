const {check,validationResult}= require("express-validator")
const bcrypt = require('bcrypt');
const Users = require("../models/User");
const jwt = require("jsonwebtoken");

const loadSignup=(req,res)=>{
    title="Create new Account";
    res.render('register',{title,errors:[],inputs:{},login:false})
}

const loadLogin=(req,res)=>{
    title="User Login"
    res.render("login",{title,errors:[],inputs:[],login:false})
}
const loginValidations =[
    check('email').not().isEmpty().withMessage("Enter a valid Email"),
    check('password').not().isEmpty().withMessage("Password is required")
]



const postLogin=  async(req,res)=>{
    const {email,password}=req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       res.render("login",{title:"User Login",errors:errors.array(),inputs:req.body,login:false})
    }
    else{
       const checkEmail = await Users.findOne({email})
       if(checkEmail!==null){
           const id = checkEmail._id;
           const dbPassword = checkEmail.password;
           const passwordVerify = await bcrypt.compare(password,dbPassword)
           if(passwordVerify){
                //  Createt token
                const token = jwt.sign({userID:id},"jwtstrong",{
                    expiresIn:"7d"
                })
                // Create session variable
                req.session.user= token;
                res.redirect("/profile");
           }else{
       res.render("login",{title:"User Login",errors:[{msg:"Wrong password"}],inputs:req.body,login:false})
               
           }
       }else{
       res.render("login",{title:"User Login",errors:[{msg:"Email is not found"}],inputs:req.body,login:false})

       }
    }
}

const registerValidations =[
    check('name').isLength({min:3}).withMessage("Name is Required and must be 3 characters long"),
    check('email').isEmail().withMessage("Enter a valid Email"),
    check('password').isLength({min:6}).withMessage("PAssword must be 6 cahracters long")
]

const postResgister = async(req,res)=>{
    const {name,email,password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const {name,email,password}=req.body;
         title="Create new Account";
        res.render("register",{title,errors:errors.array(),inputs:req.body,login:false})
    }else{
        try{
        const userEmail = await Users.findOne({email});
            if(userEmail===null){
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password,salt);
                const newUser = new Users({
                    name,email,password:hashed
                })
                try{
               const createdUser= await newUser.save();
                   req.flash("success","Your Account has been created successfully");
                    res.redirect('/login');
                }catch(err){
                    console.log(err.message)
                }
                }else{
        res.render("register",{title:"Create new Account",errors:[{msg:"Email is already exist"}],inputs:req.body,login:false})

                }
        }catch(err){
            console.log(err.message)
        }

    }

}

module.exports = {
    loadSignup,
    loadLogin,
    registerValidations,
    postResgister,
    postLogin,
    loginValidations
}