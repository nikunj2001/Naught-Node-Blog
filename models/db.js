const mongoose = require('mongoose');


const connect =async ()=>{
    try{
   await mongoose.connect("mongodb://localhost/Blog" || process.env.DB ,{useUnifiedTopology: true,useNewUrlParser:true});
       console.log("Connection established") 
    }catch(err){
            console.log(err.message)
    }
}

module.exports = connect;