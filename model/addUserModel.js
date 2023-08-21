const mongoose = require("mongoose")

const AllUserSchema = new mongoose.Schema({
    username:{
        type:String, 
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String, 
        required:true,
        // min:3,
        max:20,
        unique:true
    },
    phone:{
        type:String, 
        required:true,
        // min:3
        
    },
    time:{
        type:String, 
        // required:true,
        // min:3
    },
    lastModified:{
        type:String, 
        // min:3
    },
});

module.exports = mongoose.model("AllUsers",AllUserSchema);