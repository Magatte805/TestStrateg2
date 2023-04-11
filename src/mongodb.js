const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/AppLoginRegister")
.then(()=> {
    console.log("mongodb connected");
})
.catch ((error)=>{
    console.log("failed to connect",error);
});

const LogInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const user= new mongoose.model("Users", LogInSchema);
module.exports = user; 

