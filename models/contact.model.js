const { ObjectId } = require("bson");
const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    userID:{type:ObjectId,ref:"user"},
    contactID:{type:ObjectId,ref:"user"}
})

const Contactmodel=mongoose.model("contact",contactSchema);

module.exports={
    Contactmodel
}