const mongoose = require("mongoose");

const sgsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String
    },
    tags:{
        type:Array,
        default:[]
    },
    keywords:{
        type:Array,
        default:[]
    },
    creationtime:{
        type:Date,
        default:Date.now()
    },
    users:{
        type:Array,
        default:[]
    },
    requests:{
        type:Array,
        default:[]
    },
    blocked_users:{
        type:Array,
        default:[]
    },
    left_users:{
        type:Array,
        default:[]
    },
    No_of_posts:{
        type:Number,
        default:0
    }
})

const subgreddit = mongoose.model("Subgreddit",sgsSchema);
module.exports=subgreddit