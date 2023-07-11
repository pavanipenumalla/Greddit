const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    s_name:{
        type:String
    },
    text:{
        type:String
    },
    posted_by:{
        type:String
    },
    upvotes:{
        type:Array,
        default:[]
    },
    downvotes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
})

const post = mongoose.model("Post",postSchema);
module.exports=post