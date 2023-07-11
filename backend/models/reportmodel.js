const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
    s_name:{
        type:String
    },
    post_id:{
        type:String
    },
    report:{
        type:String
    },
    reported_on:{
        type:String
    },
    reported_by:{
        type:String
    },
    post:{
        type:String
    },
    creation_time:{
        type:Date,
        default:Date.now
    },
    set_ignore:{
        type:Boolean,
        default:false
    }
})

const report = mongoose.model("Report",reportSchema);
module.exports=report