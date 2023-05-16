const { ObjectId } = require("bson");
const mongoose=require("mongoose");
const messageSchema=mongoose.Schema({
        username:String,
        msg: String,
        time:String,
        userID:{type:ObjectId,ref:"user"}
})

const Messagemodel=mongoose.model("message",messageSchema);


module.exports={
    Messagemodel
}