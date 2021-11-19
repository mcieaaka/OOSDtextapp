var mongoose = require("mongoose");
var chatSchema= new mongoose.Schema({
    a1:{
        name:String,
        pic:String,
        id:String
    },
    a2:{
        name:String,
        pic:String,
        id:String
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ],
    timestamp:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Chat",chatSchema);