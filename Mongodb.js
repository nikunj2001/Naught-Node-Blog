const mongoose = require('mongoose')


// Connect Mongodb
const connection= async ()=>{
    try{
await mongoose.connect("mongodb://127.0.0.1/Blog",{useNewUrlParser:true,useUnifiedTopology: true })
 console.log("Mongodb Connected")
    }catch(err){
            console.log(err.message)
    }
 
}
connection()
// DEfine Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlegth:3
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
},{timestamps:true})

// Create Model
const Users  = mongoose.model("People",userSchema);

// const name = " "
// const email = "gupta@gmail.com"
// const phone = 445454;
// const newUser = new Users({
//     name,email,phone
// })

// newUser.save().then(user=>{
//     console.log(user)
// }).catch(err=>{
//     console.log(err.message)
// })

// Fetching Data
// Users.find({_id:'6054e8b329423322e4e2625c'}).then(users=>{
//     console.log(users)
// }).catch(error=>{
//     console.log(error.message)
// })

Users.findByIdAndUpdate("6054e8b329423322e4e2625c",{name:"Poorvi Gupta",email:"PoorvilovesNikunj@gmail.com"}).then(user=>{
    console.log(user)
}).catch(error=>{
    error.message
})