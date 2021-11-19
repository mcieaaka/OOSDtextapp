var mongoose = require("mongoose");
var userSchema= new mongoose.Schema({
    name:String,
    email:String,
    provider:String,
    google:Object,
    chats:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat"
        }
    ]
});

module.exports = mongoose.model("User",userSchema);