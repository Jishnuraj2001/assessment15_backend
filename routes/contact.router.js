const express=require("express");
const contactRouter=express.Router();
const{Contactmodel}=require("../models/contact.model");
const{authenticator}=require("../middlewares/authenticator.middleware");


contactRouter.post("/addcontact",authenticator,async(req,res)=>{
    const{userID,contactID}=req.body;
    try {
        const checker=await Contactmodel.findOne({contactID,userID});
        if(checker){
            res.status(201).json({"msg":"contact already exists"});
        }else{
            const contact=new Contactmodel({userID,contactID});
            await contact.save();
            res.status(201).json({"msg":"added to contacts successfully"});
        }

    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":"unable to add to contacts"});
    }
})


module.exports={
    contactRouter
}