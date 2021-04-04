const express = require('express')
const app =express();
const PORT = 5000;
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require("express-flash");
require('dotenv').config();
const connect = require('./models/db')
const userRoutes = require("./routes/userRoutes")
const profileRoutes = require("./routes/profileRoutes")
const posts= require('./routes/PostRoutes')
// DB connection
connect();

// Express session middle ware
const store = new MongoDBStore({
  uri:  "mongodb://127.0.0.1"  || process.env.DB ,
  collection:"sessions"
})
 app.use(session({
  secret: process.env.SESSION_KEY || "POORVILOVESNIKUNJ",
  resave: true,
  saveUninitialized: true,
  cookie:{
    maxAge:7*24*60*60*1000
  },
  store:store
}))
// Flash middleware
app.use(flash())
app.use((req,res,next)=>{
    res.locals.message = req.flash()
    next();
})
// Load static files
app.use(express.static("./views"));
app.use(express.urlencoded({extended:true}));
// set Ejs
app.set('view engine','ejs');

// Routes
app.use(userRoutes)
app.use(profileRoutes)
app.use(posts)
// Server
app.listen(5000,()=>{
    console.log(`server running on : ${PORT}`)
})  