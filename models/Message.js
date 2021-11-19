var mongoose = require("mongoose");
var msgSchema= new mongoose.Schema({
    author:{
        name:String,
        email:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    content:String,
    timestmp:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Message",msgSchema);