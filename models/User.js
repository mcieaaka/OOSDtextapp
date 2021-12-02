
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var passport = require("passport");

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
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);