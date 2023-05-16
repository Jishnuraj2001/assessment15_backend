require("dotenv").config();
const jwt=require("jsonwebtoken");

function authenticator(req,res,next){
    const token=req.headers.authorization;
    try {
        if(token){
            jwt.verify(token, process.env.key,(err, decoded)=>{
                if(decoded){
                    req.body.userID=decoded.userID;
                    req.body.username=decoded.username;
                    next();
                }else{
                    res.status(404).json({"msg":"somthing went wrong with authentication"});
                }
              });
        }else{
            res.status(400).json({"msg":"please login first"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":"somthing went wrong with authentication"});
    }
}


module.exports={
    authenticator
}