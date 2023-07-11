const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique:true
    },
    age: Number,
    number : Number,
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    saved_posts:{
        type:Array,
        default:[]
    }
},
);

const user= mongoose.model("User",userSchema);
module.exports = user;
